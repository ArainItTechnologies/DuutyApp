using System.Net;
using Domain.Entities;
using Domain.Enums;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using SharedKernel.Services;

namespace Duuty.Server.Features.User.HireNow;

[HttpPost("/api/user/post-job")]
[Authorize]
public class PostJobEndpoint(IJobListingService jobListingService, IEmployerService employerService, ITimeProvider timeProvider) : Endpoint<PostJobRequest, PostJobResponse>
{
    public override async Task HandleAsync(PostJobRequest request, CancellationToken ct)
    {
        try
        {
            if (string.IsNullOrEmpty(request.UserId))
            {
                await SendAsync(new PostJobResponse(false, "User ID is required."), (int)HttpStatusCode.BadRequest, ct);
                return;
            }
            var employer = await employerService.Get(employer => employer.UserId == request.UserId).SingleOrDefaultAsync();

            if (employer is null)
            {
                await SendAsync(new PostJobResponse(false, "Employer not found for the given user ID."), (int)HttpStatusCode.NotFound, ct);
                return;
            }

            var jobListingEntity = new JobListing
            {
                JobTitle = request.JobTitle,
                JobDescription = request.JobDescription,
                JobLocation = request.JobLocation,
                JobState = request.JobState,
                Requirements = request.Requirements,
                Experience = request.Experience,
                Benefits = request.Benefits,
                JobType = JobType.FullTime,
                SalaryRange = request.SalaryRange,
                DatePosted = timeProvider.UtcNow!.Value,
                ApplicationDeadline = timeProvider.UtcNow!.Value.AddDays(30),
                EmployerId = employer.Id,
            };

            await jobListingService.CreateAsync(jobListingEntity);

            if (jobListingEntity.Id <= 0)
            {
                await SendAsync(new PostJobResponse(false, "Failed to create job listing."), (int)HttpStatusCode.InternalServerError, ct);
                return;
            }

            await SendAsync(new PostJobResponse(true), (int)HttpStatusCode.OK, ct);
            return;
        }
        catch (Exception ex)
        {
            await SendAsync(new PostJobResponse(false, ex.Message), (int)HttpStatusCode.InternalServerError, ct);
            return;
        }
    }
}

public class PostJobRequest
{
    public required string JobTitle { get; set; }
    public required string JobDescription { get; set; }
    public required string JobLocation { get; set; }
    public required string JobState { get; set; }
    public required string Requirements { get; set; }
    public required string Experience { get; set; }
    public string? Benefits { get; set; }
    public required string SalaryRange { get; set; }
    public required string UserId { get; set; }
}

public record PostJobResponse(bool IsSuccess, string? ErrorMessage = default);