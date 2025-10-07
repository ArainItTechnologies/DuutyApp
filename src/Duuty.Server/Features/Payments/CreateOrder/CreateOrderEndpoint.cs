using System.Net;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Duuty.Server.Features.Payments.CreateOrder;

[HttpPost("/api/payments/create-order")]
[Authorize]
public class CreateOrderEndpoint(IRazorpayService razorpayService, IConfiguration configuration) : Endpoint<CreateOrderRequest, CreateOrderResponse>
{
    private readonly IConfiguration _configuration = configuration;

    public override async Task HandleAsync(CreateOrderRequest request, CancellationToken ct)
    {
        var keySecret = _configuration["Razorpay:KeySecret"];
        ArgumentNullException.ThrowIfNull(keySecret, nameof(keySecret));
        ArgumentNullException.ThrowIfNull(request, nameof(request));
        ArgumentNullException.ThrowIfNull(request.UserId, nameof(request.UserId));

        try
        {
            var order = await razorpayService.CreateOrderAsync(
                request.Amount,
                request.Currency ?? "INR",
                request.Description,
                request.UserId
            );

            await Send.OkAsync(new CreateOrderResponse
            {
                OrderId = order.RazorpayOrderId,
                RazorpayKeyId = keySecret,
                Amount = request.Amount,
                Receipt = order.Receipt,
                Success = true,
                Message = $"Successfully Created for the amount {(int)request.Amount * 100}"
            }, ct);
            return;
        }
        catch (Exception ex)
        {
            AddError(ex.Message);
            ThrowIfAnyErrors((int)HttpStatusCode.InternalServerError);
            return;
        }
    }

}

public class CreateOrderResponse
{
    public string OrderId { get; set; } = string.Empty;
    public string RazorpayKeyId { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Receipt { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; }
}

public class CreateOrderRequest
{
    public required decimal Amount { get; set; }
    public required string Currency { get; set; } = "INR";
    public required string Description { get; set; }
    public required string UserId { get; set; }
}