using System.ComponentModel.DataAnnotations;
using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class EmployerProfile: Entity
{
    [Key]
    public long Id { get; set; }
    public required string UserId { get; set; }
    public string? OrganisationName { get; set; }
    public string? AddressLine1 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? PostCode { get; set; }
    public string? WebsiteUrl { get; set; }
}
