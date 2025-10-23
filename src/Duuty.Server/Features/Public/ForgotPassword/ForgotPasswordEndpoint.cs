using System.Net;
using System.Text;
using DataAccess.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using SharedKernel.Services;

namespace Duuty.Server.Features.Public.ForgotPassword;

[HttpPost("/api/public/forgot-password")]
[AllowAnonymous]
public class ForgotPasswordEndpoint(UserManager<ArainUser> userManager, IEmailSender emailSender, IMessageService messageService, IConfiguration configuration) : Endpoint<ForgotPasswordRequest, ForgotPasswordResponse>
{
    public override async Task HandleAsync(ForgotPasswordRequest request, CancellationToken ct)
    {
        var user = await userManager.FindByEmailAsync(request.Email!);
        if (user is null)
        {
            await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
            return;
        }

        var token = await userManager.GeneratePasswordResetTokenAsync(user!);

        var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var resetLink = $"{configuration["ClientAppBaseUrl"]}/reset-password?userId={user!.Id}&token={encodedToken}";

        if (!string.IsNullOrEmpty(request.PhoneNumber))
        {
            await messageService.SendWhatsAppMessage(request.PhoneNumber!, resetLink);
        }

        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            await emailSender.SendEmailAsync(request.Email!, EmailType.Reset, resetLink);
        }

        await Send.OkAsync(ct);
        return;
    }
}

public class ForgotPasswordResponse
{
    public required bool IsSuccess { get; set; }
    public string? Message { get; set; }
}

public class ForgotPasswordRequest
{
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
}
