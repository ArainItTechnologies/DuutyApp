using System.Net;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Duuty.Server.Features.Payments.VerifyPayment;

[HttpPost("/payments/api/verify-payment")]
[Authorize]
public class VerifyPaymentEndpoint(IRazorpayService razorpayService) : Endpoint<VerifyPaymentRequest, VerifyPaymentResponse>
{
    public override async Task HandleAsync(VerifyPaymentRequest request, CancellationToken ct)
    {
        try
        {
            var transaction = await razorpayService.ProcessPaymentAsync(
                request.PaymentId,
                request.OrderId,
                request.Signature
            );

            await Send.OkAsync(new VerifyPaymentResponse(transaction.Status == "success", transaction.Id, transaction.Status), ct);
        }
        catch (Exception ex)
        {
            AddError(ex.Message);
            ThrowIfAnyErrors((int)HttpStatusCode.InternalServerError);
            return;
        }
    }
}

public class VerifyPaymentRequest
{
    public required string PaymentId { get; set; }
    public required string OrderId { get; set; }
    public required string Signature { get; set; }
}

public record VerifyPaymentResponse(bool Success, int TransactionId, string Status);