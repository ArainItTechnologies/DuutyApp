using Application;
using DataAccess.Identity;
using Domain.Entities;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using SharedKernel.Services;
using System.Text;

namespace Web.Server.Features.Public.Register;

[HttpPost("/public/api/register")]
[AllowAnonymous]
public class RegisterEndpoint : Endpoint<RegisterModel, RegistrationResponse>
{
    private readonly UserManager<ArainUser> _userManager;
    private readonly IEmployeeJobRoleService _employeeJobRoleService;
    private readonly IEmailSender _emailSender;
    private readonly IConfiguration _configuration;
    private readonly ITimeProvider _timeProvider;

    public RegisterEndpoint(
        UserManager<ArainUser> userManager,
        IEmployeeJobRoleService employeeJobRoleService,
        IEmailSender emailSender,
        IConfiguration configuration,
        ITimeProvider timeProvider)
    {
        _userManager = userManager;
        _employeeJobRoleService = employeeJobRoleService;
        _emailSender = emailSender;
        _configuration = configuration;
        _timeProvider = timeProvider;
    }
    public override async Task HandleAsync(RegisterModel model, CancellationToken ct)
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
            await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider)
               .ContinueWith(async otp =>
               {
                   if (otp.IsCompletedSuccessfully)
                   {
                       await _emailSender.SendEmailAsync(
                           model.PhoneNumber!,
                           EmailType.Otp,
                           otp.Result);
                   }
               }, ct);
        }

        if (!string.IsNullOrWhiteSpace(model.Email))
        {
            await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider)
                .ContinueWith(async otp =>
                {
                    if (otp.IsCompletedSuccessfully)
                    {
                        await _emailSender.SendEmailAsync(
                            model.Email!,
                            EmailType.Otp,
                            otp.Result);
                    }
                }, ct);
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
