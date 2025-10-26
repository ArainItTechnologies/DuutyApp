using System.ComponentModel.DataAnnotations;
using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class EmployeeJobRole : Entity
{
    [Key]
    public long Id { get; set; }
    public required string UserId { get; set; }
    public required List<string> PreferredRoles { get; set; } = new();
    public string? Location { get; set; }
    public string? Availability { get; set; }
    public string? Experience { get; set; }
}
