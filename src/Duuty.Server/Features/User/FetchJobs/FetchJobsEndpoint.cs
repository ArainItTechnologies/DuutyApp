using System.Net;
using Domain.Entities;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Duuty.Server.Features.User.FetchJobs;

[HttpGet("/api/jobs")]
[AllowAnonymous]
public class FetchJobsEndpoint(IJobListingService jobListingService) : Endpoint<FetchJobsRequest, FetchJobsResponse>
{
    public override async Task HandleAsync(FetchJobsRequest req, CancellationToken ct)
    {
        var preferredJob = req.PreferredJob.ToLower();
        var jobLocation = req.JobLocation.ToLower();
        var jobState = req.JobState.ToLower();

        try
        {
            var query = jobListingService.Get(x => x.IsActive);
            if (string.IsNullOrWhiteSpace(preferredJob) && string.IsNullOrEmpty(jobState) && string.IsNullOrEmpty(jobLocation))
            {
                var defaultJobs = await jobListingService.Get(x => x.IsActive).ToListAsync(ct);
                defaultJobs = defaultJobs.Take(10).ToList();
                await SendAsync(new FetchJobsResponse(true, defaultJobs), (int)HttpStatusCode.OK, ct);
                return;
            }

            // Apply filters only if the parameter is provided
            if (!string.IsNullOrWhiteSpace(preferredJob))
            {
                query = query.Where(x => x.JobTitle.ToLower().Contains(preferredJob));
            }
            if (!string.IsNullOrWhiteSpace(jobLocation))
            {
                query = query.Where(x => x.JobLocation.ToLower().Contains(jobLocation));
            }
            if (!string.IsNullOrWhiteSpace(jobState))
            {
                query = query.Where(x => x.JobState.ToLower().Contains(jobState));
            }

            List<JobListing> jobs;
            if (string.IsNullOrWhiteSpace(preferredJob) && string.IsNullOrWhiteSpace(jobLocation) && string.IsNullOrWhiteSpace(jobState))
            {
                jobs = await query.Take(10).ToListAsync(ct);
            }
            else
            {
                jobs = await query.ToListAsync(ct);
            }

            await SendAsync(new FetchJobsResponse(true, jobs), (int)HttpStatusCode.OK, ct);
            return;
        }
        catch (Exception ex)
        {
            await SendAsync(new FetchJobsResponse(false, [], ex.Message), (int)HttpStatusCode.InternalServerError, ct);
            return;
        }

    }
}

public class FetchJobsRequest
{
    [QueryParam]
    public string JobLocation { get; set; } = string.Empty;
    [QueryParam]
    public string JobState { get; set; } = string.Empty;
    [QueryParam]
    public string PreferredJob { get; set; } = string.Empty;
}

public record FetchJobsResponse(bool IsSuccess, List<JobListing> Jobs, string? ErrorMessage = "");

