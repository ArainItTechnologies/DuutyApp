using System.Text;
using DataAccess.Identity;
using Infrastructure.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;

namespace Web.Server.Features.Public.Resend
{
    [HttpPost("/api/public/resend/confirm")]
    [AllowAnonymous]
    public class ResendConfirmEndpoint : Endpoint<ResendRequest, AuthResponse>
    {
        private readonly UserManager<ArainUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;
        public ResendConfirmEndpoint(
            UserManager<ArainUser> userManager,
            IEmailSender emailSender,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _configuration = configuration;
        }

        public override async Task HandleAsync(ResendRequest request, CancellationToken ct)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user is null)
            {
                await Send.NotFoundAsync(ct);
                return;
            }
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var confirmationLink = $"{_configuration["ClientAppBaseUrl"]}/confirm?userId={user.Id}&token={encodedToken}";
            await _emailSender.SendEmailAsync(request.Email, "Confirm your email", confirmationLink);
            await Send.OkAsync(new AuthResponse { IsAuthSuccessful = true, Token = token }, ct);
        }
    }
}
