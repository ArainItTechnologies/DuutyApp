using SharedKernel.BaseEntity;

namespace Domain;

public class Subscription : Entity
{
    public long Id { get; set; }
    public string PlanName { get; set; } = default!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public long CompanyId { get; set; }
    public Company Company { get; set; } = default!;
}