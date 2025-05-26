using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class Organisation : Entity
{
    public long Id { get; set; }
    public required string OranisationName { get; set; }
    public string? WebsiteUrl { get; set; }
    public long? AddressId { get; set; }
    public virtual Address? Address { get; set; }
}
