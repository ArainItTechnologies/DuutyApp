using DataAccess.Identity;
using Domain.Entities;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using SharedKernel.Services;
using System.ComponentModel.DataAnnotations;

namespace Web.Server.Features.Public.Register;

[HttpPost("/api/public/register")]
[AllowAnonymous]
public class RegisterEndpoint : Endpoint<RegistrationRequest, RegistrationResponse>
{
    private readonly UserManager<ArainUser> _userManager;
    private readonly IEmployeeJobRoleService _employeeJobRoleService;
    private readonly IEmailSender _emailSender;
    private readonly IMessageService _messageService;
    private readonly ITimeProvider _timeProvider;

    public RegisterEndpoint(
        UserManager<ArainUser> userManager,
        IEmployeeJobRoleService employeeJobRoleService,
        IEmailSender emailSender,
        IMessageService messageService,
        ITimeProvider timeProvider)
    {
        _userManager = userManager;
        _employeeJobRoleService = employeeJobRoleService;
        _emailSender = emailSender;
        _messageService = messageService;
        _timeProvider = timeProvider;
    }
    public override async Task HandleAsync(RegistrationRequest model, CancellationToken ct)
    {
        if (!string.IsNullOrWhiteSpace(model.PhoneNumber) && !string.IsNullOrWhiteSpace(model.Email))
        {
            AddError("username", "Provide either phone number or email, not both.");
            await Send.ErrorsAsync(cancellation: ct);
            return;
        }

        var userName = !string.IsNullOrWhiteSpace(model.PhoneNumber)
            ? model.PhoneNumber
            : model.Email;

        if (string.IsNullOrWhiteSpace(userName))
        {
            AddError("username", "Phone number or email is required.");
            await Send.ErrorsAsync(cancellation: ct);
            return;
        }

        // Check if a user with same username (phone when provided, otherwise email) already exists
        if (await _userManager.FindByNameAsync(userName) is not null)
        {
            AddError("registration", "A user with the provided phone number or email already exists.");
            await Send.ErrorsAsync(cancellation: ct);
            return;
        }

        // Check email uniqueness explicitly (prevents same email across different usernames)
        if (!string.IsNullOrWhiteSpace(model.Email))
        {
            var existingByEmail = await _userManager.FindByEmailAsync(model.Email);
            if (existingByEmail is not null)
            {
                AddError("email", "Email is already in use.");
                await Send.ErrorsAsync(cancellation: ct);
                return;
            }
        }

        // Check phone uniqueness explicitly (in case username selection / lookup differs elsewhere)
        if (!string.IsNullOrWhiteSpace(model.PhoneNumber))
        {
            var phoneExists = await _userManager.Users.AnyAsync(u => u.PhoneNumber == model.PhoneNumber);
            if (phoneExists)
            {
                AddError("phone", "Phone number is already in use.");
                await Send.ErrorsAsync(cancellation: ct);
                return;
            }
        }

        var user = new ArainUser
        {
            UserName = userName,
            FullName = model.FullName,
            Email = model.Email,
            PhoneNumber = model.PhoneNumber,
            TwoFactorEnabled = true,
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            AddError("registration", string.Join(", ", result.Errors.Select(e => e.Description)));
            await Send.ErrorsAsync(cancellation: ct);
            return;
        }

        if (!string.IsNullOrEmpty(model.PhoneNumber))
        {
            var otp = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider);
            if (string.IsNullOrEmpty(otp))
            {
                AddError("otp", "Failed to generate phone OTP.");
                await Send.ErrorsAsync(cancellation: ct);
                return;
            }

            var sent = await _messageService.SendWhatsAppMessage(model.PhoneNumber!, otp);
            if (!sent)
            {
                AddError("otp", "Failed to send phone OTP.");
                await Send.ErrorsAsync(cancellation: ct);
                return;
            }
        }

        if (!string.IsNullOrWhiteSpace(model.Email))
        {
            var otp = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider);
            if (string.IsNullOrEmpty(otp))
            {
                AddError("otp", "Failed to generate email OTP.");
                await Send.ErrorsAsync(cancellation: ct);
                return;
            }

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
    public required string FullName { get; set; }
}

public class RegistrationResponse
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public string? Token { get; set; }
    public string? UserId { get; set; }
    public string? Error { get; set; }
}
