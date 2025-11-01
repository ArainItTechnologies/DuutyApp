using Infrastructure.DTO;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Duuty.Server.Features.Admin.FetchEmployers;

[HttpGet("/api/admin/employers")]
[Authorize(Roles = "Admin")]
public class FetchEmployersEndpoint(IEmployerService employerService) : EndpointWithoutRequest<FetchEmployersResponse>
{
    public override async Task HandleAsync(CancellationToken ct)
    {
        var employers = await employerService.Get().Select(y => new EmployerDto
        {
            Id = y.Id,
            Email = y.Email,
            SubscriptionPlan = y.EmployerSubscription!.Plan,
            SubscriptionStatus = y.EmployerSubscription.Status,
            RegistrationDate = y.DateCreated!.Value,
            ActiveJobs = y.EmployerSubscription.ActiveJobs
        }).ToListAsync();
        await Send.OkAsync(new FetchEmployersResponse(employers), cancellation: ct);
    }
}

public record FetchEmployersResponse(List<EmployerDto> Employers);