using FastEndpoints;
using Microsoft.AspNetCore.Authorization;

namespace Duuty.Server.Features.Employer.FetchJobPosts;

[HttpGet("/api/employer/job-posts")]
[Authorize(Roles = "Employer")]
public class FetchJobPostsEndpoint
{
}
