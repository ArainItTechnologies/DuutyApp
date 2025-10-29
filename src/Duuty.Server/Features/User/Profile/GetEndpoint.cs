using DataAccess.Identity;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Duuty.Server.Features.User.Profile;

[HttpGet("/api/user/profile")]
[AllowAnonymous]
public class GetEndpoint(IUserProfileService userProfileService, UserManager<ArainUser> userManager) : Endpoint<UserProfileRequest, UserProfileResponse>
{
    public override async Task HandleAsync(UserProfileRequest req, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(req.UserId);
        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }
        var profile = userProfileService.Get(x => x.UserId == req.UserId).FirstOrDefault();

        if (profile is null)
        {
            await Send.OkAsync(new UserProfileResponse
            {
                UserId = user.Id,
                FullName = user.FullName,
                Phone = user.PhoneNumber,
                Email = user.Email
            }, ct);
            return;
        }

        var response = new UserProfileResponse
        {
            UserId = user.Id,
            FullName = user.FullName,
            Phone = user.PhoneNumber,
            Email = user.Email,
            Experience = profile.Experience,
            Locations = profile.Locations,
            Availability = profile.Availability,
            PreferredRoles = profile.PreferredRoles,
            DateCreated = profile.DateCreated
        };

        await Send.OkAsync(response, ct);
        return;
    }
}

public class UserProfileRequest
{
    public required string UserId { get; set; }
}

public class UserProfileResponse
{
    public DateTimeOffset? DateCreated { get; set; }
    public List<string> PreferredRoles { get; set; } = [];
    public string? Availability { get; set; }
    public List<string> Locations { get; set; } = [];
    public string? Experience { get; set; }
    public required string UserId { get; set; }
    public string? FullName { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
}