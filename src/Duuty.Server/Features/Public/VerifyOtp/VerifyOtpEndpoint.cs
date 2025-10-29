using System.Net;
using DataAccess.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Duuty.Server.Features.Public.VerifyOtp;

[HttpPost("/api/public/verify-otp")]
[AllowAnonymous]
public class VerifyOtpEndpoint(UserManager<ArainUser> userManager) : Endpoint<VerifyOtpRequest, VerifyOtpResponse>
{
    public override async Task HandleAsync(VerifyOtpRequest request, CancellationToken ct)
    {
        var isPhone = !string.IsNullOrWhiteSpace(request.PhoneNumber);
        var userName = isPhone ? request.PhoneNumber : request.UserEmail;
        var tokenProvider = isPhone ? TokenOptions.DefaultPhoneProvider : TokenOptions.DefaultEmailProvider;
        try
        {
            var user = await userManager.FindByNameAsync(userName!);

            if (user is null)
            {
                await Send.NotFoundAsync(ct);
                return;
            }

            var result = await userManager.VerifyTwoFactorTokenAsync(user, tokenProvider, request.Otp);
            if (!result)
            {
                await Send.UnauthorizedAsync(ct);
                return;
            }

            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            await userManager.ConfirmEmailAsync(user, token);

            await Send.OkAsync(new VerifyOtpResponse { IsVerified = true , UserId = user.Id}, ct);
            return;
        }
        catch (Exception ex)
        {
            AddError(ex.Message);
            ThrowIfAnyErrors((int)HttpStatusCode.InternalServerError);
            return;
        }
    }
}

public class VerifyOtpResponse
{
    public bool IsVerified { get; set; }
    public string? Message { get; set; }
    public required string UserId { get; set; }
}

public class VerifyOtpRequest
{
    public string? PhoneNumber { get; set; }
    public string? UserEmail { get; set; }
    public required string Otp { get; set; }
}