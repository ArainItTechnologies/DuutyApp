using DataAccess.Identity;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Duuty.Server.Features.Employer.FetchJobPosts;

[HttpGet("/employer/api/jobs")]
[Authorize(Roles = "Employer")]
public class FetchJobPostsEndpoint(UserManager<ArainUser> userManager, IJobListingService jobListingService, IEmployerService employerService) : Endpoint<FetchJobPostsRequest, FetchJobPostsResponse>
{
    public override async Task HandleAsync(FetchJobPostsRequest request, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(request.UserId);

        if (string.IsNullOrEmpty(request.UserId))
        {
            await Send.NotFoundAsync(ct);
            return;
        }
        var employer = await employerService.Get(employer => employer.UserId == request.UserId).SingleOrDefaultAsync();

        if (employer is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        var jobsPosted = await jobListingService.Get(job => job.EmployerId == employer.Id).ToListAsync();
    }
}

public class FetchJobPostsRequest
{
    public required string UserId { get; set; }
}

public record FetchJobPostsResponse(bool Success, string Message);
