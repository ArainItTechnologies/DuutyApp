using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class PaymentTransaction : Entity
{
    public int Id { get; set; }
    public required string RazorpayPaymentId { get; set; }
    public required string RazorpayOrderId { get; set; }
    public required string RazorpaySignature { get; set; }
    public decimal Amount { get; set; }
    public required string Status { get; set; }
    public required string Method { get; set; }
    public required string Description { get; set; }

    // Foreign key
    public int PaymentOrderId { get; set; }
    public virtual PaymentOrder? PaymentOrder { get; set; }
}