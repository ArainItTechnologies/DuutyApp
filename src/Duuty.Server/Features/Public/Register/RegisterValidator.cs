using FluentValidation;

namespace Web.Server.Features.Public.Register;

public class RegisterValidator : Validator<RegistrationRequest>
{
    public RegisterValidator()
    {
        // Require email only when phone is not provided
        RuleFor(x => x.Email)
            .NotEmpty()
            .When(x => string.IsNullOrWhiteSpace(x.PhoneNumber))
            .WithMessage("Either Email or PhoneNumber is required.");

        // Validate email format only when an email was provided
        RuleFor(x => x.Email)
            .EmailAddress()
            .When(x => !string.IsNullOrWhiteSpace(x.Email))
            .WithMessage("Invalid email address.");

        // Require phone only when email is not provided
        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .When(x => string.IsNullOrWhiteSpace(x.Email))
            .WithMessage("Either Email or PhoneNumber is required.");

        // Validate phone format only when phone was provided
        RuleFor(x => x.PhoneNumber)
            .Matches(@"^(?:\+91)?[6-9]\d{9}$")
            .When(x => !string.IsNullOrWhiteSpace(x.PhoneNumber))
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
