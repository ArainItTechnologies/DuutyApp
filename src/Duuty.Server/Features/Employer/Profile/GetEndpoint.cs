using DataAccess.Identity;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Duuty.Server.Features.Employer.Profile;

[HttpGet("/api/employer/profile")]
[AllowAnonymous]
public class GetEndpoint(UserManager<ArainUser> userManager, IEmployerProfileService profileService) : Endpoint<EmployerProfileRequest, EmployerProfileResponse>
{
    public override async Task HandleAsync(EmployerProfileRequest req, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(req.UserId);
        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        var profile = await profileService.Get(x => x.UserId == req.UserId).SingleOrDefaultAsync(ct);

        var response = new EmployerProfileResponse
        {
            UserId = user.Id,
            Phone = user.PhoneNumber,
            Email = user.Email,
            OrganisationName = user.FullName,
            DateCreated = profile?.DateCreated,
            WebsiteUrl = profile?.WebsiteUrl ?? string.Empty,
            AddressLine1 = profile?.AddressLine1 ?? string.Empty,
            City = profile?.City ?? string.Empty,
            State = profile?.State ?? string.Empty,
            Country = profile?.Country ?? "India",
            PostalCode = profile?.PostCode ?? string.Empty,
        };

        await Send.OkAsync(response, ct);
        return;
    }
}

public class EmployerProfileRequest
{
    public required string UserId { get; set; }
}

public class EmployerProfileResponse
{
    public DateTimeOffset? DateCreated { get; set; }
    public required string UserId { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? OrganisationName { get; set; }
    public string? AddressLine1 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? PostalCode { get; set; }
    public string? WebsiteUrl { get; set; }
}