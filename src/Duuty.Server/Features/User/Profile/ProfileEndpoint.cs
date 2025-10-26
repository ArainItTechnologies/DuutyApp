using DataAccess.Identity;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Duuty.Server.Features.User.Profile;

[HttpGet("/api/user/profile")]
[AllowAnonymous]
public class ProfileEndpoint(IEmployeeJobRoleService employeeJobRoleService, UserManager<ArainUser> userManager) : Endpoint<ProfileRequest, ProfileResponse>
{
    public override async Task HandleAsync(ProfileRequest req, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(req.UserId);
        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }
        var profile = employeeJobRoleService.Get(x => x.UserId == req.UserId).FirstOrDefault();

        if (profile is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        var response = new ProfileResponse
        {
            UserId = user.Id,
            FullName = user.FullName,
            Phone = user.PhoneNumber,
            Email = user.Email,
            Experience = profile.Experience,
            Location = profile.Location,
            Availability = profile.Availability,
            PreferredRoles = profile.PreferredRoles,
            DateCreated = profile.DateCreated
        };

        await Send.OkAsync(response, ct);
        return;
    }
}

public class ProfileRequest
{
    public required string UserId { get; set; }
}

public class ProfileResponse
{
    public DateTimeOffset? DateCreated { get; set; }
    public List<string> PreferredRoles { get; set; } = new();
    public string? Availability { get; set; }
    public string? Location { get; set; }
    public string? Experience { get; set; }
    public required string UserId { get; set; }
    public string? FullName { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
}