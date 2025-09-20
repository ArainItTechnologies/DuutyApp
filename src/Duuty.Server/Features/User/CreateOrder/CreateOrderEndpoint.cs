using System.Net;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Duuty.Server.Features.User.Payments;

[HttpPost("/user/api/create-order")]
[Authorize]
public class CreateOrderEndpoint(IRazorpayService razorpayService) : Endpoint<CreateOrderRequest, CreateOrderResponse>
{
    public override async Task HandleAsync(CreateOrderRequest request, CancellationToken ct)
    {
        try
        {
            var order = await razorpayService.CreateOrderAsync(
                request.Amount,
                request.Currency ?? "INR",
                request.Description,
                request.UserId
            );

            await Send.OkAsync(new CreateOrderResponse(true, order.RazorpayOrderId, order.Receipt, $"Successfully Created for the amount {(int)request.Amount * 100}"), ct);
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

public record CreateOrderResponse(bool Success, string Id, string Receipt, string Message);

public class CreateOrderRequest
{
    public required decimal Amount { get; set; }
    public required string Currency { get; set; } = "INR";
    public required string Description { get; set; }
    public required string UserId { get; set; }
}