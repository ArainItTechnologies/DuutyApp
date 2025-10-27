using DataAccess.Identity;
using Domain.Entities;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using SharedKernel.Services;

namespace Duuty.Server.Features.User.Profile;

[HttpPost("/api/user/profile")]
[Authorize]
public class UpdateEndpoint(IUserProfileService userProfileService,
                            UserManager<ArainUser> userManager,
                            ITimeProvider timeProvider): Endpoint<UpdateProfileRequest, UpdateProfileResponse>
{
    public override async Task HandleAsync(UpdateProfileRequest req, CancellationToken ct)
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
        var profile = userProfileService.Get(x => x.UserId == req.UserId).FirstOrDefault();

        if (profile is null)
        {
            profile = new UserProfile
            {
                UserId = req.UserId,
                Experience = req.Experience,
                Availability = req.Availability,
                Locations = req.Locations ?? [],
                PreferredRoles = req.PreferredRoles ?? [],
                DateCreated = now,
                LastUpdated = now
            };

            await userProfileService.CreateAsync(profile);
        }
        else
        {
            profile.Experience = req.Experience;
            profile.Availability = req.Availability;
            profile.Locations = req.Locations ?? [];
            profile.PreferredRoles = req.PreferredRoles ?? [];
            profile.LastUpdated = now;

            await userProfileService.UpdateAsync(profile);
        }

        await Send.OkAsync(new UpdateProfileResponse { Success = true }, ct);
    }
}

public class UpdateProfileRequest
{
    public required string UserId { get; set; }
    public required string Availability { get; set; }
    public required string Experience { get; set; }
    public List<string> PreferredRoles { get; set; } = [];
    public List<string> Locations { get; set; } = [];
    public required string FullName { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
}

public class UpdateProfileResponse
{
    public bool Success { get; set; }
}
