using DataAccess.Identity;
using Infrastructure.JwtFeatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Web.Server.Features.Public.Login;

[HttpPost("/public/api/login")]
[AllowAnonymous]
public class LoginEndpoint(UserManager<ArainUser> userManager, JwtHandler jwtHandler) : Endpoint<LoginRequest, LoginResponse>
{
    public override async Task HandleAsync(LoginRequest request, CancellationToken ct)
    {
        var user = await userManager.FindByEmailAsync(request.Email!);
        if (user is null || !await userManager.CheckPasswordAsync(user, request.Password))
        {
            await Send.UnauthorizedAsync(ct);
            return;
        }

        if (!user.EmailConfirmed)
        {
            await Send.ForbiddenAsync(ct);
            return;
        }

        var roles = await userManager.GetRolesAsync(user);

        var token = jwtHandler.CreateToken(user, roles);

        await Send.OkAsync(new LoginResponse
        {
            Success = true,
            UserId = user.Id,
            Token = token,
            Message = roles.Count == 0 ? "User has no roles." : null
        }, ct);
        return;
    }
}

public class LoginRequest
{
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public required string Password { get; set; }
}

public class LoginResponse
{
    public string? UserId { get; set; }
    public bool Success { get; set; }
    public string? Message { get; set; }
    public string? Token { get; set; }
}
