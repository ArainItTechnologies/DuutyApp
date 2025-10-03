using FluentValidation;

namespace Web.Server.Features.Public.Register;

public class RegisterValidator : Validator<RegistrationRequest>
{
    public RegisterValidator()
    {
        RuleFor(x => x.Email).NotEmpty()
            .When(x => string.IsNullOrEmpty(x.PhoneNumber))
            .EmailAddress()
            .WithMessage("Either Email or PhoneNumber is required.");
        RuleFor(x => x.PhoneNumber).NotEmpty()
            .When(x => string.IsNullOrEmpty(x.Email))
            .WithMessage("Either Email or PhoneNumber is required.")
            .Matches(@"^(?:\+91)?[6-9]\d{9}$")
            .WithMessage("Phone number must be a valid 10-digit Indian mobile number.");
        RuleFor(x => x.Password).NotEmpty()
            .MinimumLength(6);
        RuleFor(x => x.PreferredRole).NotEmpty()
            .When(x => !x.IsEmployer)
            .WithMessage("PreferredRole is required when IsEmployer is false.");
        RuleFor(x => x.ConfirmPassword).Equal(x => x.Password)
            .WithMessage("Password and confirmation password do not match.");
    }
}
