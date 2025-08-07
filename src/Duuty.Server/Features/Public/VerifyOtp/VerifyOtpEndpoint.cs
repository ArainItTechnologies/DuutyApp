using System.Net;
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
        try
        {
            var user = await userManager.FindByNameAsync(userName!);

            if (user is null)
            {
                await SendNotFoundAsync(ct);
                return;
            }

            var result = await userManager.VerifyTwoFactorTokenAsync(user, tokenProvider, request.Otp);
            if (!result)
            {
                await SendUnauthorizedAsync(ct);
                return;
            }

            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            await userManager.ConfirmEmailAsync(user, token);

            await SendAsync(new VerifyOtpResponse { IsVerified = true }, (int)HttpStatusCode.OK, ct);
            return;
        }
        catch (Exception ex)
        {
            await SendAsync(new VerifyOtpResponse { IsVerified = false, Message = ex.Message }, (int)HttpStatusCode.InternalServerError, ct);
            return;
        }
    }
}

public class VerifyOtpResponse
{
    public bool IsVerified { get; set; }
    public string? Message { get; set; }
}

public class VerifyOtpRequest
{
    public string? PhoneNumber { get; set; }
    public string? UserEmail { get; set; }
    public required string Otp { get; set; }
}