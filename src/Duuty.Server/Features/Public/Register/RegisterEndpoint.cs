using System.ComponentModel.DataAnnotations;
using System.Text;
using Application;
using DataAccess.Identity;
using Domain.Entities;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using SharedKernel.Services;

namespace Web.Server.Features.Public.Register;

[HttpPost("/public/api/register")]
[AllowAnonymous]
public class RegisterEndpoint : Endpoint<RegistrationRequest, RegistrationResponse>
{
    private readonly UserManager<ArainUser> _userManager;
    private readonly IEmployeeJobRoleService _employeeJobRoleService;
    private readonly IEmailSender _emailSender;
    private readonly IMessageService _messageService;
    private readonly IConfiguration _configuration;
    private readonly ITimeProvider _timeProvider;

    public RegisterEndpoint(
        UserManager<ArainUser> userManager,
        IEmployeeJobRoleService employeeJobRoleService,
        IEmailSender emailSender,
        IMessageService messageService,
        IConfiguration configuration,
        ITimeProvider timeProvider)
    {
        _userManager = userManager;
        _employeeJobRoleService = employeeJobRoleService;
        _emailSender = emailSender;
        _messageService = messageService;
        _configuration = configuration;
        _timeProvider = timeProvider;
    }
    public override async Task HandleAsync(RegistrationRequest model, CancellationToken ct)
    {
        var userName = !string.IsNullOrWhiteSpace(model.Email)
            ? model.Email
            : model.PhoneNumber;

        var user = new ArainUser
        {
            UserName = userName,
            Email = model.Email,
            PhoneNumber = model.PhoneNumber,
            TwoFactorEnabled = true,
        };

        IdentityResult result;
        if (string.IsNullOrEmpty(model.Password))
        {
            result = await _userManager.CreateAsync(user);
        }
        else
        {
            result = await _userManager.CreateAsync(user, model.Password);
        }

        if (!result.Succeeded)
        {
            AddError("registration", string.Join(", ", result.Errors.Select(e => e.Description)));
            await Send.ErrorsAsync(cancellation: ct);
            return;
        }

        if (string.IsNullOrEmpty(model.Password))
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user!);

            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var resetLink = $"{_configuration["ClientAppBaseUrl"]}/resetPassword?userId={user!.Id}&token={encodedToken}";

            await _emailSender.SendEmailAsync(
                model.Email!,
                EmailType.Reset,
                resetLink);
        }

        if (!string.IsNullOrEmpty(model.PhoneNumber))
        {
            var otp = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider);
            await _messageService.SendWhatsAppMessage(model.PhoneNumber!, otp);
        }

        if (!string.IsNullOrWhiteSpace(model.Email))
        {
            var otp = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider);
            await _emailSender.SendEmailAsync(model.Email!, EmailType.Otp, otp);
        }

        await _userManager.AddToRoleAsync(user, "User");
        if (!model.IsEmployer)
        {
            await _employeeJobRoleService.CreateAsync(new EmployeeJobRole
            {
                UserId = user.Id,
                PreferredRole = model.PreferredRole!,
                DateCreated = _timeProvider.UtcNow,
                LastUpdated = _timeProvider.UtcNow,
            });
        }

        await Send.OkAsync(new RegistrationResponse
        {
            IsSuccess = true,
            UserId = user.Id,
            Message = "User registered successfully",
        }, cancellation: ct);
    }
}

public class RegistrationRequest
{
    [Required]
    [MinLength(6)]
    public required string Password { get; set; }

    [Required]
    [Compare(nameof(Password), ErrorMessage = "Password and confirmation password do not match.")]
    public required string ConfirmPassword { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? PreferredRole { get; set; }
    public bool IsEmployer { get; set; } = false;
}

public class RegistrationResponse
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public string? Token { get; set; }
    public string? UserId { get; set; }
    public string? Error { get; set; }
}
