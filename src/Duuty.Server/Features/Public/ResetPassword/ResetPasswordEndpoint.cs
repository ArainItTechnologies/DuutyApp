using System.Net;
using System.Text;
using DataAccess.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Duuty.Server.Features.Public.ResetPassword;

[HttpPost("/api/public/reset-password")]
[AllowAnonymous]
public class ResetPasswordEndpoint(UserManager<ArainUser> userManager) : Endpoint<ResetPasswordRequest, ResetPasswordResponse>
{
    public override async Task HandleAsync(ResetPasswordRequest req, CancellationToken ct)
    {
        if (req.NewPassword != req.ConfirmPassword)
        {
            AddError("password", "Password and confirmation do not match.");
            await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
            return;
        }

        var user = await userManager.FindByIdAsync(req.UserId);
        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        string decodedToken;
        try
        {
            decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(req.Token));
        }
        catch
        {
            AddError("token", "Invalid token.");
            await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
            return;
        }

        var result = await userManager.ResetPasswordAsync(user, decodedToken, req.NewPassword);
        if (!result.Succeeded)
        {
            AddError("reset", string.Join(", ", result.Errors.Select(e => e.Description)));
            await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
            return;
        }

        await Send.OkAsync(new ResetPasswordResponse { IsSuccess = true, Message = "Password has been reset." }, ct);
    }
}

public class ResetPasswordRequest
{
    public required string UserId { get; set; }
    public required string Token { get; set; } // Base64Url encoded token from the link
    public required string NewPassword { get; set; }
    public required string ConfirmPassword { get; set; }
}

public class ResetPasswordResponse
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
}
