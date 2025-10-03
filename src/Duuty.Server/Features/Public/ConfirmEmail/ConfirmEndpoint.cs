using System.Net;
using System.Text;
using DataAccess.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;

namespace Web.Server.Features.Public.ConfirmEmail;

[HttpPost("/public/api/confirm")]
[AllowAnonymous]
public class ConfirmEndpoint(UserManager<ArainUser> userManager, IEmailSender emailSender) : EndpointWithoutRequest<ConfirmResponse>
{
    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = Query<Guid>("userId");
        var token = Query<string>("token");
        if (userId == Guid.Empty || string.IsNullOrWhiteSpace(token))
        {
            await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
            return;
        }
        var user = await userManager.FindByIdAsync(userId.ToString());
        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        var decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));

        var result = await userManager.ConfirmEmailAsync(user, decodedToken);
        if (result.Succeeded)
        {
            await emailSender.SendEmailAsync(
                user.Email!,
                EmailType.Verified,
                string.Empty);
            await Send.NotFoundAsync(ct);
            return;
        }

        await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
    }
}

public record ConfirmResponse(bool IsSuccess, string Message);
