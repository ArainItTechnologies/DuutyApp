using SharedKernel.BaseEntity;

namespace Domain;

public class Company : Entity
{
    public long Id { get; set; }
    public string Name { get; set; } = default!;
    public Address Address { get; set; } = default!;
    public List<Subscription> Subscriptions { get; set; } = new();
}
