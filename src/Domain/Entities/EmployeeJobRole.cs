using SharedKernel.BaseEntity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class EmployeeJobRole : Entity
{
    [Key]
    public long Id { get; set; }
    public required string UserId { get; set; }
    public required string PreferredRole { get; set; }
}
