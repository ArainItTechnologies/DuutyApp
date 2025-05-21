using Domain.Enums;
using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class JobListing : Entity
{
    public long Id { get; set; }
    public required string JobTitle { get; set; }
    public required string JobDescription { get; set; }
    public required string JobLocation { get; set; }
    public required string JobState { get; set; }
    public required string Requirements { get; set; }
    public required string Experience { get; set; }
    public string? Benefits { get; set; }
    public required JobType JobType { get; set; }
    public required string SalaryRange { get; set; }
    public DateTimeOffset DatePosted { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ApplicationDeadline { get; set; }
    public long? EmployerId { get; set; }
    public bool IsActive { get; set; } = true;
}
