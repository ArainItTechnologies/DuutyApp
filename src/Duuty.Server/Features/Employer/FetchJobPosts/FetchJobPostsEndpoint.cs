using DataAccess.Identity;
using Domain.Entities;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Duuty.Server.Features.Employer.FetchJobPosts;

[HttpGet("/api/employer/jobs")]
[Authorize(Roles = "Employer")]
public class FetchJobPostsEndpoint(UserManager<ArainUser> userManager, IJobListingService jobListingService, IEmployerProfileService employerService, IJobApplicationService applicationService) : Endpoint<FetchJobPostsRequest, FetchJobPostsResponse>
{
    public override async Task HandleAsync(FetchJobPostsRequest request, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(request.UserId);

        if (string.IsNullOrEmpty(request.UserId))
        {
            await Send.NotFoundAsync(ct);
            return;
        }
        var employer = await employerService.Get(employer => employer.UserId == request.UserId).SingleOrDefaultAsync(ct);

        if (employer is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        var jobsPosted = await jobListingService.Get(job => job.EmployerId == employer.Id && job.IsActive).ToListAsync(ct);

        var jobIds = jobsPosted.Select(j => j.Id).ToList();

        var appCounts = await applicationService.Get(a => jobIds.Contains(a.JobListingId))
            .GroupBy(a => a.JobListingId)
            .Select(g => new { JobId = g.Key, Count = g.Count() })
            .ToListAsync(ct);
        var jobsDto = jobsPosted.Select(j => new FetchJobPostedDto
        {
            Id = j.Id,
            Title = j.JobTitle,
            Location = string.IsNullOrWhiteSpace(j.JobState) ? j.JobLocation : $"{j.JobLocation}, {j.JobState}",
            Applications = appCounts.FirstOrDefault(x => x.JobId == j.Id)?.Count ?? 0,
            Status = j.IsActive ? "Active" : "Inactive",
            PostedDate = j.DatePosted.ToString("yyyy-MM-dd"),
            Salary = j.SalaryRange
        }).OrderByDescending(x => x.PostedDate).ToList();

        await Send.OkAsync(new FetchJobPostsResponse(true, "Active Jobs", jobsDto), ct);
        return;
    }
}

public class FetchJobPostsRequest
{
    public required string UserId { get; set; }
}

public record FetchJobPostsResponse(bool Success, string Message, List<FetchJobPostedDto>? Data);

public class FetchJobPostedDto
{
    public long Id { get; set; }
    public required string Title { get; set; }
    public required string Location { get; set; }
    public int Applications { get; set; }
    public required string Status { get; set; }
    public required string PostedDate { get; set; }
    public required string Salary { get; set; }
}
