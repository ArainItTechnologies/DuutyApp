using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class JobApplication : Entity
{
    public long Id { get; set; }
    public required string UserId { get; set; }
    public required long JobListingId { get; set; }
    public DateTimeOffset AppliedOn { get; set; } = DateTimeOffset.UtcNow;
}

