using System.Text;
using Domain.Entities;
using Infrastructure.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Razorpay.Api;

namespace Infrastructure.Services;

public class RazorpayService : IRazorpayService
{
    private readonly IPaymentTransactionService _paymentTransactionService;
    private readonly IPaymentOrderService _paymentOrderService;
    private readonly IConfiguration _configuration;
    private readonly RazorpayClient _razorpayClient;

    public RazorpayService(IPaymentTransactionService paymentTransactionService, IPaymentOrderService paymentOrderService, IConfiguration configuration, RazorpayClient razorpayClient)
    {
        _paymentTransactionService = paymentTransactionService;
        _paymentOrderService = paymentOrderService;
        _configuration = configuration;
        _razorpayClient = razorpayClient;
    }

    public async Task<PaymentOrder> CreateOrderAsync(decimal amount, string currency, string description, string userId)
    {
        var receipt = $"rcpt_{DateTime.UtcNow.Ticks}";

        var orderRequest = new Dictionary<string, object>
        {
            {"amount", (int)(amount * 100)}, // Convert to paise
            {"currency", currency},
            {"receipt", receipt}
        };

        var razorpayOrder = _razorpayClient.Order.Create(orderRequest);

        var paymentOrder = new PaymentOrder
        {
            RazorpayOrderId = razorpayOrder["id"].ToString(),
            Amount = amount,
            Currency = currency,
            Receipt = receipt,
            Status = razorpayOrder["status"].ToString(),
            UserId = userId,
            Description = description
        };

        await _paymentOrderService.CreateAsync(paymentOrder);

        return paymentOrder;
    }

    public Task<bool> VerifyPaymentSignature(string orderId, string paymentId, string signature)
    {
        var keySecret = _configuration["Razorpay:KeySecret"];
        var payload = $"{orderId}|{paymentId}";

        var computedSignature = ComputeHmacSha256(payload, keySecret);
        return Task.FromResult(computedSignature == signature);
    }

    public async Task<PaymentTransaction> ProcessPaymentAsync(string paymentId, string orderId, string signature)
    {
        var paymentOrder = await _paymentOrderService.Get(x => x.RazorpayOrderId == orderId).SingleOrDefaultAsync();

        if (paymentOrder == null)
            throw new InvalidOperationException("Order not found");

        var isValid = await VerifyPaymentSignature(orderId, paymentId, signature);

        var payment = _razorpayClient.Payment.Fetch(paymentId);


        var transaction = new PaymentTransaction
        {
            RazorpayPaymentId = paymentId,
            RazorpayOrderId = orderId,
            RazorpaySignature = signature,
            Amount = paymentOrder.Amount,
            Status = isValid ? "success" : "failed",
            PaymentOrderId = paymentOrder.Id,
            Description = paymentOrder.Description,
            Method = payment["method"]
        };

        await _paymentTransactionService.CreateAsync(transaction);

        if (isValid)
        {
            paymentOrder.Status = "paid";
        }

        return transaction;
    }

    private string ComputeHmacSha256(string data, string key)
    {
        var keyBytes = Encoding.UTF8.GetBytes(key);
        var dataBytes = Encoding.UTF8.GetBytes(data);

        using (var hmac = new System.Security.Cryptography.HMACSHA256(keyBytes))
        {
            var hash = hmac.ComputeHash(dataBytes);
            return Convert.ToHexString(hash).ToLower();
        }
    }
}