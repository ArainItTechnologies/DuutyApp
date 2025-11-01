using System.Diagnostics.Metrics;
using DataAccess.Identity;
using Domain.Entities;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using SharedKernel.Services;

namespace Duuty.Server.Features.Employer.Profile;

[HttpPost("/api/employer/profile")]
[AllowAnonymous]
public class UpdateEndpoint(IEmployerProfileService employerProfileService,
                            UserManager<ArainUser> userManager,
                            ITimeProvider timeProvider) : Endpoint<UpdateEmployeeProfileRequest, UpdateProfileResponse>
{
    public override async Task HandleAsync(UpdateEmployeeProfileRequest req, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(req.UserId);

        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }
        user.FullName = req.FullName;
        user.PhoneNumber = req.PhoneNumber;
        user.Email = req.Email;
        await userManager.UpdateAsync(user);

        var now = timeProvider.UtcNow;
        var profile = employerProfileService.Get(x => x.UserId == req.UserId).FirstOrDefault();

        if (profile is null)
        {
            profile = new EmployerProfile
            {
                UserId = req.UserId,
                OrganisationName = req.FullName,
                AddressLine1 = req.AddressLine1,
                WebsiteUrl = req.WebsiteUrl,
                City = req.City,
                State = req.State,
                Country = req.Country,
                PostCode = req.PostCode,
                DateCreated = now,
                LastUpdated = now
            };

            await employerProfileService.CreateAsync(profile);
        }
        else
        {
            profile.OrganisationName = req.FullName;
            profile.AddressLine1 = req.AddressLine1;
            profile.WebsiteUrl = req.WebsiteUrl;
            profile.City = req.City;
            profile.State = req.State;
            profile.Country = req.Country;
            profile.PostCode = req.PostCode;
            profile.LastUpdated = now;

            await employerProfileService.UpdateAsync(profile);
        }

        await Send.OkAsync(new UpdateProfileResponse { Success = true }, ct);
    }
}

public class UpdateEmployeeProfileRequest
{
    public required string UserId { get; set; }
    public required string FullName { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public required string AddressLine1 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string Country { get; set; }
    public required string PostCode { get; set; }
    public required string WebsiteUrl { get; set; } = string.Empty;
}

public class UpdateProfileResponse
{
    public bool Success { get; set; }
}
