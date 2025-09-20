using System.Net;
using Domain.Entities;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using SharedKernel.Services;

namespace Duuty.Server.Features.User.ApplyJob;

[HttpPost("/user/api/apply")]
[Authorize]
public class ApplyJobEndpoint(IJobListingService jobListingService, IJobApplicationService applicationService, ITimeProvider timeProvider) : Endpoint<ApplyJobRequest, ApplyJobResponse>
{
    public override async Task HandleAsync(ApplyJobRequest req, CancellationToken ct)
    {
        var job = await jobListingService.Get(x => x.Id == req.JobListingId && x.IsActive).SingleOrDefaultAsync();
        if (job is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        var isAlreadyApplied = await applicationService.Get(x => x.JobListingId == req.JobListingId && x.UserId == req.UserId).AnyAsync(ct);

        if (isAlreadyApplied)
        {
            await Send.ErrorsAsync((int)HttpStatusCode.Conflict, ct);
            return;
        }

        var jobApplication = new JobApplication
        {
            JobListingId = req.JobListingId,
            UserId = req.UserId,
            AppliedOn = timeProvider.UtcNow!.Value,
            DateCreated = timeProvider.UtcNow!.Value,
            LastUpdated = timeProvider.UtcNow!.Value
        };

        await applicationService.CreateAsync(jobApplication);

        await Send.OkAsync(new ApplyJobResponse(true), ct);
    }
}

public record ApplyJobResponse(bool Success, string? ErrorMessage = null);

public class ApplyJobRequest
{
    public required long JobListingId { get; set; }
    public required string UserId { get; set; }
}