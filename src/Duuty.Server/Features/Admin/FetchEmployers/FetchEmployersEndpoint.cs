using DataAccess.Identity;
using Infrastructure.DTO;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Duuty.Server.Features.Admin.FetchEmployers;

[HttpGet("/api/admin/employers")]
[Authorize(Roles = "Admin")]
public class FetchEmployersEndpoint(UserManager<ArainUser> userManager, IEmployerProfileService employerProfile, IJobListingService jobListingService) : Endpoint<GetEmployersRequest, FetchEmployersResponse>
{
    public override async Task HandleAsync(GetEmployersRequest req, CancellationToken ct)
    {
        var searchString = req.Search?.Trim().ToLower() ?? string.Empty;

        var users = userManager.Users.Where(u => EF.Functions.Like(u.FullName!.ToLower(), $"{searchString}") ||
                EF.Functions.Like(u.Email!.ToLower(), $"%{searchString}%"));
        var profiles = employerProfile.Get(profile => EF.Functions.Like(profile.OrganisationName!.ToLower(), $"%{searchString}%")).AsQueryable();
        var jobs = jobListingService.Get().AsQueryable();

        var employerDtos = await (from u in users
                       join p in profiles on u.Id equals p.UserId
                       select new EmployerDto 
                       { 
                           RestaurantName = p.OrganisationName!,
                           Email = u.Email!,
                           RegistrationDate = p.DateCreated!.Value.ToString("dd-MM-yyyy"),
                           Location = $"{p.City}, {p.State}",
                           SubscriptionPlan = Domain.Enums.SubscriptionPlan.Quarterly,
                           SubscriptionStatus = Domain.Enums.SubscriptionStatus.Active,
                           ActiveJobs = jobs.Count(x => x.IsActive),
                           TotalJobs = jobs.Count()
                       }).ToListAsync(cancellationToken: ct);

        await Send.OkAsync(new FetchEmployersResponse { Employers = employerDtos }, cancellation: ct);
    }
}



public class FetchEmployersResponse
{
    public List<EmployerDto> Employers { get; set; }
}

public class GetEmployersRequest
{
    public string? Search { get; set; }
    public string? Status { get; set; }
    public string? Plan { get; set; }
}