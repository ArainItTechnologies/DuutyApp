using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class PaymentOrder : Entity
{
    public int Id { get; set; }
    public string RazorpayOrderId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "INR";
    public string Receipt { get; set; }
    public string Status { get; set; } = "created";
    public string UserId { get; set; }
    public string Description { get; set; }

    // Navigation property
    public virtual ICollection<PaymentTransaction> Transactions { get; set; }
}