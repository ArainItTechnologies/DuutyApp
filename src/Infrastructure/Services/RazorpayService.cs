using System.Security.Cryptography;
using System.Text;
using Domain.Entities;
using Infrastructure.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Razorpay.Api;
using SharedKernel.Services;

namespace Infrastructure.Services;

public class RazorpayService : IRazorpayService
{
    private readonly IPaymentTransactionService _paymentTransactionService;
    private readonly IPaymentOrderService _paymentOrderService;
    private readonly IConfiguration _configuration;
    private readonly RazorpayClient _razorpayClient;
    private readonly ITimeProvider _timeProvider;

    public RazorpayService(IPaymentTransactionService paymentTransactionService, IPaymentOrderService paymentOrderService, IConfiguration configuration, RazorpayClient razorpayClient, ITimeProvider timeProvider)
    {
        _paymentTransactionService = paymentTransactionService;
        _paymentOrderService = paymentOrderService;
        _configuration = configuration;
        _razorpayClient = razorpayClient;
        _timeProvider = timeProvider;
    }

    public async Task<PaymentOrder> CreateOrderAsync(decimal amount, string currency, string description, string userId)
    {
        var receipt = $"rcpt_{_timeProvider.UtcNow!.Value.Ticks}";

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

    public async Task<bool> VerifyPaymentSignature(string orderId, string paymentId, string signature)
    {
        var keySecret = _configuration["Razorpay:KeySecret"];
        ArgumentException.ThrowIfNullOrEmpty(keySecret, nameof(keySecret));
        ArgumentException.ThrowIfNullOrEmpty(orderId, nameof(orderId));
        var payload = $"{orderId}|{paymentId}";

        var computedSignature = await ComputeHmacSha256Async(payload, keySecret);
        return computedSignature.Equals(signature, StringComparison.OrdinalIgnoreCase);
    }

    public async Task<PaymentTransaction> ProcessPaymentAsync(string paymentId, string orderId, string signature)
    {
        var paymentOrder = await _paymentOrderService.Get(x => x.RazorpayOrderId == orderId).SingleOrDefaultAsync();

        ArgumentNullException.ThrowIfNull(paymentOrder, nameof(paymentOrder));

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

        paymentOrder.Transactions.Add(transaction);
        await _paymentTransactionService.CreateAsync(transaction);
        await _paymentOrderService.UpdateAsync(paymentOrder);

        if (isValid)
        {
            paymentOrder.Status = "paid";
        }

        return transaction;
    }

    internal async Task<string> ComputeHmacSha256Async(string data, string key)
    {
        var keyBytes = Encoding.UTF8.GetBytes(key);
        var dataBytes = Encoding.UTF8.GetBytes(data);

        using var hmac = new HMACSHA256(keyBytes);
        using var ms = new MemoryStream(dataBytes);
        var hash = await hmac.ComputeHashAsync(ms);
        return Convert.ToHexString(hash).ToLower();
    }
}