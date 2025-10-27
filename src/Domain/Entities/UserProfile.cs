using SharedKernel.BaseEntity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Domain.Entities;

public class UserProfile : Entity
{
    [Key]
    public long Id { get; set; }
    public required string UserId { get; set; }
    public string? Availability { get; set; }
    public string? Experience { get; set; }

    // Persisted JSON column
    public string PreferredRolesJson { get; set; } = "[]";
    public string LocattionsJson { get; set; } = "[]";

    // Exposed list used by the app; not mapped directly by EF
    [NotMapped]
    public List<string> Locations
    {
        get => string.IsNullOrEmpty(LocattionsJson) ? [] : JsonSerializer.Deserialize<List<string>>(LocattionsJson) ?? [];
        set => LocattionsJson = JsonSerializer.Serialize(value ?? []);
    }

    [NotMapped]
    public List<string> PreferredRoles
    {
        get => string.IsNullOrEmpty(PreferredRolesJson) ? [] : JsonSerializer.Deserialize<List<string>>(PreferredRolesJson) ?? [];
        set => PreferredRolesJson = JsonSerializer.Serialize(value ?? []);
    }
}
