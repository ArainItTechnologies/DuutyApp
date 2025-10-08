using FluentValidation;

namespace Duuty.Server.Features.Payments.VerifyPayment;

public class VerifyPaymentValidator : Validator<VerifyPaymentRequest>
{
    public VerifyPaymentValidator()
    {
        RuleFor(x => x.PaymentId)
            .NotEmpty()
            .WithMessage("PaymentId is required.");

        RuleFor(x => x.OrderId)
            .NotEmpty()
            .WithMessage("OrderId is required.");

        RuleFor(x => x.Signature)
            .NotEmpty()
            .WithMessage("Signature is required.");
    }
}
