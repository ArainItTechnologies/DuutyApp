using System.ComponentModel.DataAnnotations;
using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class EmployeeJobRole : Entity
{
    [Key]
    public long Id { get; set; }
    public required string UserId { get; set; }
    public required string PreferredRole { get; set; }
}
