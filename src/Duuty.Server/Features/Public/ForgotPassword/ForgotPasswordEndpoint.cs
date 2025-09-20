using System.Net;
using System.Text;
using Application;
using DataAccess.Identity;
using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;

namespace Web.Server.Features.Public.ForgotPassword;

[HttpPost("/public/api/forgot-password")]
[AllowAnonymous]
public class ForgotPasswordEndpoint : Endpoint<ForgotPasswordRequest, ForgotPasswordResponse>
{
    private readonly UserManager<ArainUser> _userManager;
    private readonly IEmailSender _emailSender;
    private readonly IConfiguration _configuration;

    public ForgotPasswordEndpoint(UserManager<ArainUser> userManager, IEmailSender emailSender, IConfiguration configuration)
    {
        _userManager = userManager;
        _emailSender = emailSender;
        _configuration = configuration;
    }

    public override async Task HandleAsync(ForgotPasswordRequest request, CancellationToken ct)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
            return;
        }

        var token = await _userManager.GeneratePasswordResetTokenAsync(user!);

        var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var resetLink = $"{_configuration["ClientAppBaseUrl"]}/resetPassword?userId={user!.Id}&token={encodedToken}";

        await _emailSender.SendEmailAsync(
            request.Email,
            EmailType.Reset,
            resetLink);

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
    public required string Email { get; set; }
}
