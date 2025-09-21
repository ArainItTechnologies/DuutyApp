using System.Net;
using Domain.Entities;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Duuty.Server.Features.User.FetchJobs;

[HttpGet("/user/api/jobs")]
[AllowAnonymous]
public class FetchJobsEndpoint(IJobListingService jobListingService, IJobApplicationService applicationService) : Endpoint<FetchJobsRequest, FetchJobsResponse>
{
    public override async Task HandleAsync(FetchJobsRequest req, CancellationToken ct)
    {
        var preferredJob = req.PreferredJob.ToLower();
        var jobLocation = req.JobLocation.ToLower();
        var jobState = req.JobState.ToLower();

        try
        {
            var appliedJobIds = await applicationService.Get(x => x.UserId == req.UserId).Select(y => y.JobListingId).ToListAsync();

            var query = jobListingService.Get(x => x.IsActive);
            if (string.IsNullOrWhiteSpace(preferredJob) && string.IsNullOrEmpty(jobState) && string.IsNullOrEmpty(jobLocation))
            {
                var jobListings = await jobListingService.Get(x => x.IsActive).ToListAsync(ct);
                var defaultJobs = jobListings.Select(job => JobPostDto.ToDto(job, appliedJobIds)).ToList();
                await Send.OkAsync(new FetchJobsResponse(true, defaultJobs), ct);
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

            var jobs = await query.ToListAsync(ct);

            var jobPosts = jobs.Select(job => JobPostDto.ToDto(job, appliedJobIds)).ToList();

            await Send.OkAsync(new FetchJobsResponse(true, jobPosts), ct);
            return;
        }
        catch (Exception ex)
        {
            AddError(ex.Message);
            ThrowIfAnyErrors((int)HttpStatusCode.InternalServerError);
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

    public required string UserId { get; set; }
}

public record FetchJobsResponse(bool IsSuccess, List<JobPostDto> Jobs, string? ErrorMessage = "");


public class JobPostDto
{
    public long JobId { get; set; }
    public bool IsApplied { get; set; }
    public bool IsActive { get; set; }
    public required string JobTitle { get; set; }
    public required string JobLocation { get; set; }
    public required string SalaryRange { get; set; }
    public long? EmployerId { get; set; }

    public static JobPostDto ToDto(JobListing job, List<long> appliedJobIds)
    {
        return new JobPostDto
        {
            JobId = job.Id,
            IsApplied = appliedJobIds.Contains(job.Id),
            IsActive = job.IsActive,
            JobTitle = job.JobTitle,
            JobLocation = job.JobLocation,
            SalaryRange = job.SalaryRange,
            EmployerId = job.EmployerId
        };
    }
}

