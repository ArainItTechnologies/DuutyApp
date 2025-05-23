using System.Net;
using Domain.Entities;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Duuty.Server.Features.User.FetchJobs;

[HttpGet("/api/jobs")]
[AllowAnonymous]
public class FetchJobsEndpoint(IJobListingService jobListingService) : EndpointWithoutRequest<FetchJobsResponse>
{
    public override async Task HandleAsync(CancellationToken ct)
    {
        var queryString = Query<string>("search")?.ToLower();
        try
        {
            if (string.IsNullOrWhiteSpace(queryString))
            {
                var defaultJobs = await jobListingService.Get(x => x.IsActive).ToListAsync(ct);
                defaultJobs = defaultJobs.Take(10).ToList();
                await SendAsync(new FetchJobsResponse(true, defaultJobs), (int)HttpStatusCode.OK, ct);
                return;
            }

            var jobSearchResults = await jobListingService.Get(x => x.IsActive 
                    && (x.JobDescription.ToLower().Contains(queryString)
                    || x.JobTitle.ToLower().Contains(queryString)
                    || x.JobState.ToLower().Contains(queryString)
                    || x.JobLocation.ToLower().Contains(queryString)))
                .ToListAsync(ct);

            await SendAsync(new FetchJobsResponse(true, jobSearchResults), (int)HttpStatusCode.OK, ct);
            return;
        }
        catch (Exception ex)
        {
            await SendAsync(new FetchJobsResponse(false, [], ex.Message), (int)HttpStatusCode.InternalServerError, ct);
            return;
        }

    }
}

public record FetchJobsResponse(bool IsSuccess, List<JobListing> Jobs, string? errorMessage = "");

