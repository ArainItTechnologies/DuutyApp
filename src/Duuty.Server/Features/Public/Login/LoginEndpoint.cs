using DataAccess.Identity;
using Infrastructure.JwtFeatures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using SharedKernel.Services;

namespace Web.Server.Features.Public.Login;

[HttpPost("/api/public/login")]
[AllowAnonymous]
public class LoginEndpoint(UserManager<ArainUser> userManager, JwtHandler jwtHandler, IEmailSender emailSender, IMessageService messageService) : Endpoint<LoginRequest, LoginResponse>
{
    public override async Task HandleAsync(LoginRequest request, CancellationToken ct)
    {
        // Determine whether the caller provided a phone number or an email.
        var isPhone = !string.IsNullOrWhiteSpace(request.PhoneNumber);
        ArainUser? user = isPhone
            ? await userManager.FindByNameAsync(request.PhoneNumber!)
            : await userManager.FindByEmailAsync(request.Email!);

        if (user is null || !await userManager.CheckPasswordAsync(user, request.Password))
        {
            await Send.UnauthorizedAsync(ct);
            return;
        }

        // If logging in with phone number, require phone confirmation only.
        if (isPhone)
        {
            if (!user.PhoneNumberConfirmed)
            {
                var otp = await userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider);
                if (string.IsNullOrWhiteSpace(otp))
                {
                    AddError("otp", "Failed to generate OTP for phone number confirmation.");
                    await Send.ErrorsAsync(cancellation: ct);
                    return;
                }

                var sent = await messageService.SendWhatsAppMessage(user.PhoneNumber!, otp);
                if (!sent)
                {
                    AddError("otp", "Failed to send phone OTP.");
                    await Send.ErrorsAsync(cancellation: ct);
                    return;
                }

                await Send.OkAsync(new LoginResponse
                {
                    Success = false,
                    UserId = user.Id,
                    RequiresOtp = true,
                    Message = "Phone Number not confirmed. OTP has been sent to your WhatsApp."
                }, ct);

                return;
            }
        }
        else
        {
            // Logging in with email — require email confirmation only.
            if (!user.EmailConfirmed)
            {
                var otp = await userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider);
                if (string.IsNullOrWhiteSpace(otp))
                {
                    AddError("otp", "Failed to generate OTP for email confirmation.");
                    await Send.ErrorsAsync(cancellation: ct);
                    return;
                }

                await emailSender.SendEmailAsync(user.Email!, EmailType.Otp, otp);

                await Send.OkAsync(new LoginResponse
                {
                    Success = false,
                    UserId = user.Id,
                    RequiresOtp = true,
                    Message = "Email not confirmed. OTP has been sent to your email address."
                }, ct);

                return;
            }
        }

        var roles = await userManager.GetRolesAsync(user);

        var token = jwtHandler.CreateToken(user, roles);

        await Send.OkAsync(new LoginResponse
        {
            Success = true,
            UserId = user.Id,
            Token = token,
            RequiresOtp = false,
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
    public bool RequiresOtp { get; set; }
}
