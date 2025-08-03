using DataAccess.Identity;
using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Duuty.Server.Features.Public.VerifyOtp;

[HttpPost("/api/verify-otp")]
[AllowAnonymous]
public class VerifyOtpEndpoint(UserManager<ArainUser> userManager) : Endpoint<VerifyOtpRequest, VerifyOtpResponse>
{
    public override async Task HandleAsync(VerifyOtpRequest request, CancellationToken ct)
    {
        var isPhone = !string.IsNullOrWhiteSpace(request.PhoneNumber);
        var userName = isPhone ? request.PhoneNumber : request.UserEmail;
        var tokenProvider = isPhone ? TokenOptions.DefaultPhoneProvider : TokenOptions.DefaultEmailProvider;

        var user = await userManager.FindByNameAsync(userName!);

        if (user is null)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        await userManager.VerifyTwoFactorTokenAsync(user, tokenProvider, request.Otp)
            .ContinueWith(async response =>
            {
                if (response.Result)
                {
                    if (!isPhone)
                    {
                        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                        await userManager.ConfirmEmailAsync(user, token);
                    }
                    await SendOkAsync(new VerifyOtpResponse { IsVerified = true }, ct);
                    return;
                }
                await SendUnauthorizedAsync(ct);
                return;
            }, ct);
    }
}

public class VerifyOtpResponse
{
    public bool IsVerified { get; set; }
}

public class VerifyOtpRequest
{
    public string? PhoneNumber { get; set; }
    public string? UserEmail { get; set; }
    public required string Otp { get; set; }
}