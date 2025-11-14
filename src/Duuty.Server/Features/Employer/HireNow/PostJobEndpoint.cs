using System.Net;
using System.Security.Claims;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using SharedKernel.Services;

namespace Duuty.Server.Features.Employer.HireNow;

[HttpPost("/api/employer/post-job")]
[Authorize]
public class PostJobEndpoint(IJobListingService jobListingService, IEmployerProfileService employerService, ITimeProvider timeProvider, IEmployerSubscriptionService employerSubscriptionService) : Endpoint<PostJobRequest, PostJobResponse>
{
    public override async Task HandleAsync(PostJobRequest request, CancellationToken ct)
    {
        try
        {
            // Detect caller role (SuperAdmin should be allowed to post on behalf of another user)
            var caller = HttpContext?.User;
            var authUserId = caller?.FindFirstValue(ClaimTypes.NameIdentifier);

            var isSuperAdmin = caller?.IsInRole("SuperAdmin");

            // If caller is SuperAdmin and request.UserId is provided use that; otherwise prefer id from token
            var userId = isSuperAdmin!.Value && !string.IsNullOrWhiteSpace(request.UserId)
                ? request.UserId
                : (!string.IsNullOrEmpty(authUserId) ? authUserId : request.UserId);

            if (string.IsNullOrEmpty(userId))
            {
                AddError("AUTH_REQUIRED", "Authentication required: no user id found in token. Please sign in and try again.");
                await Send.ErrorsAsync((int)HttpStatusCode.Unauthorized, ct);
                return;
            }
            var employer = await employerService.Get(employer => employer.UserId == userId).SingleOrDefaultAsync(ct);

            if (employer is null)
            {
                AddError("EMPLOYER_NOT_FOUND", "Employer profile not found. Please create an employer profile before posting jobs.");
                await Send.ErrorsAsync((int)HttpStatusCode.NotFound, ct);
                return;
            }

            var employerSubscription = await employerSubscriptionService.Get(x => x.UserId == userId && x.Status == SubscriptionStatus.Active).FirstOrDefaultAsync(ct);

            if (employerSubscription is null)
            {
                AddError("SUBSCRIPTION_REQUIRED", "An active employer subscription is required to post jobs. Please subscribe or renew your plan in the Pricing section, or contact support if you believe this is an error.");
                await Send.ErrorsAsync((int)HttpStatusCode.PaymentRequired, cancellation: ct);
                return;
            }

            var activeCount = await jobListingService.Get(x => x.IsActive).CountAsync(ct);

            if(activeCount >= employerSubscription.ActiveJobs)
            {
                AddError("JOB_POST_LIMIT_REACHED", "You have reached your job posting limit for your current subscription plan. Please upgrade your plan to post more jobs.");
                await Send.ErrorsAsync((int)HttpStatusCode.Forbidden, ct);
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
                JobType = request.JobType,
                SalaryRange = request.SalaryRange,
                DatePosted = timeProvider.UtcNow!.Value,
                ApplicationDeadline = timeProvider.UtcNow!.Value.AddDays(30),
                EmployerId = employer.Id,
                UserId = userId
            };

            await jobListingService.CreateAsync(jobListingEntity);

            if (jobListingEntity.Id <= 0)
            {
                AddError("CREATE_JOB_FAILED", "Unable to create job listing. Please try again.");
                await Send.ErrorsAsync((int)HttpStatusCode.InternalServerError, ct);
                return;
            }

            await Send.OkAsync(new PostJobResponse(true), ct);
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
    public string? UserId { get; set; }
    public JobType JobType { get; set; }
}

public record PostJobResponse(bool IsSuccess, string? ErrorMessage = default);