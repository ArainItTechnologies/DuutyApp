using System.Net;
using DataAccess.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Duuty.Server.Features.Public.Resend;

[HttpPost("/public/api/resend/otp")]
[AllowAnonymous]
public class ResendOtpEndpoint(UserManager<ArainUser> userManager, IEmailSender emailSender) : Endpoint<ResendOtpRequest, ResendOtpResponse>
{
    public override async Task HandleAsync(ResendOtpRequest request, CancellationToken ct)
    {
        var isPhone = !string.IsNullOrWhiteSpace(request.PhoneNumber);
        var userName = isPhone ? request.PhoneNumber : request.Email;
        var tokenProvider = isPhone ? TokenOptions.DefaultPhoneProvider : TokenOptions.DefaultEmailProvider;

        var user = await userManager.FindByNameAsync(userName!);

        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        await userManager.GenerateTwoFactorTokenAsync(user, tokenProvider)
           .ContinueWith(async otp =>
           {
               if (otp.IsFaulted)
               {
                   await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
                   return;
               }

               if (isPhone)
               {
                   // TODO: SMS/whatsapp Implementation
                   await Send.OkAsync(new ResendOtpResponse(true, "OTP resent successfully to phone"), ct);
                   return;
               }
               else
               {
                   await emailSender.SendEmailAsync(request.Email!, EmailType.Otp, otp.Result);
                   await Send.OkAsync(new ResendOtpResponse(true, "OTP resent successfully to email"), ct);
                   return;
               }

           }, ct);
    }
}

public class ResendOtpRequest
{
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
}

public record ResendOtpResponse(bool Success, string? Message);
