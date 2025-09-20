using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class PaymentTransaction : Entity
{
    public int Id { get; set; }
    public string RazorpayPaymentId { get; set; }
    public string RazorpayOrderId { get; set; }
    public string RazorpaySignature { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; }
    public string Method { get; set; }
    public string Description { get; set; }

    // Foreign key
    public int PaymentOrderId { get; set; }
    public virtual PaymentOrder PaymentOrder { get; set; }
}