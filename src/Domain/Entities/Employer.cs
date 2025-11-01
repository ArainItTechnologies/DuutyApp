using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class Employer : Entity
{
    public long Id { get; set; }
    public string UserId { get; set; } = default!;
    public string Email { get; set; } = default!;
    public long? EmployerSubscriptionId { get; set; }
    public virtual EmployerSubscription? EmployerSubscription { get; set; }
}
