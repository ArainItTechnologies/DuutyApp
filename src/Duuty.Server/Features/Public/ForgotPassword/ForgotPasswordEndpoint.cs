using System.Net;
using System.Text;
using DataAccess.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using SharedKernel.Services;

namespace Web.Server.Features.Public.ForgotPassword;

[HttpPost("/public/api/forgot-password")]
[AllowAnonymous]
public class ForgotPasswordEndpoint : Endpoint<ForgotPasswordRequest, ForgotPasswordResponse>
{
    private readonly UserManager<ArainUser> _userManager;
    private readonly IEmailSender _emailSender;
    private readonly IMessageService _messageService;
    private readonly IConfiguration _configuration;

    public ForgotPasswordEndpoint(UserManager<ArainUser> userManager, IEmailSender emailSender, IMessageService messageService, IConfiguration configuration)
    {
        _userManager = userManager;
        _emailSender = emailSender;
        _messageService = messageService;
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

        if (!string.IsNullOrEmpty(request.PhoneNumber))
        {
            await _messageService.SendWhatsAppMessage(request.PhoneNumber!, resetLink);
        }

        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            await _emailSender.SendEmailAsync(request.Email!, EmailType.Reset, resetLink);
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
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}
