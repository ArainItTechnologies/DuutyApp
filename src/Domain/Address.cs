using SharedKernel.BaseEntity;

namespace Domain;

public class Address : Entity
{
    public long Id { get; set; }
    public required string Street { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public required string Postcode { get; set; }
}