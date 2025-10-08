﻿using FluentValidation;

namespace Web.Server.Features.Public.Login;

public class LoginValidator : Validator<LoginRequest>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email).NotEmpty()
                             .When(x => string.IsNullOrEmpty(x.PhoneNumber))
                             .WithMessage("Either Email or PhoneNumber is required.");

        RuleFor(x => x.PhoneNumber).NotEmpty()
                                   .When(x => string.IsNullOrEmpty(x.Email))
                                   .WithMessage("Either Email or PhoneNumber is required.");

        RuleFor(x => x.PhoneNumber)
            .Matches(@"^[6-9]\d{9}$")
            .When(x => !string.IsNullOrEmpty(x.PhoneNumber))
            .WithMessage("PhoneNumber must be a valid mobile number.");
    }
}
