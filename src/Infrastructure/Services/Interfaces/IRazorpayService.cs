using Domain.Entities;

namespace Infrastructure.Services.Interfaces;

public interface IRazorpayService
{
    Task<PaymentOrder> CreateOrderAsync(decimal amount, string currency, string description, string userId);
    Task<bool> VerifyPaymentSignature(string orderId, string paymentId, string signature);
    Task<PaymentTransaction> ProcessPaymentAsync(string paymentId, string orderId, string signature);
}
