using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class Employer : Entity
{
    public long Id { get; set; }
    public string UserId { get; set; } = default!;
    public string Email { get; set; } = default!;
    public virtual Organisation Organisation { get; set; } = default!;
}
