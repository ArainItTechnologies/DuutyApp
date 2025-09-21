using FastEndpoints;
using FluentValidation;

namespace Duuty.Server.Features.Payments.Subscription;

public class SubscriptionValidator : Validator<SubscriptionRequest>
{
    public SubscriptionValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("UserId is required.");
        RuleFor(x => x.Plan)
            .NotEmpty()
            .WithMessage("Plan is required.");
    }
}
