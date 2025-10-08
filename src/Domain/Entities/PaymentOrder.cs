using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class PaymentOrder : Entity
{
    public int Id { get; set; }
    public required string RazorpayOrderId { get; set; }
    public decimal Amount { get; set; }
    public required string Currency { get; set; } = "INR";
    public required string Receipt { get; set; }
    public required string Status { get; set; } = "created";
    public required string UserId { get; set; }
    public required string Description { get; set; }

    // Navigation property
    public virtual ICollection<PaymentTransaction> Transactions { get; set; } = new List<PaymentTransaction>();
}