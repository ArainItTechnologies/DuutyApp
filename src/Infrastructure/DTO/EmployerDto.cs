using Domain.Enums;

namespace Infrastructure.DTO;

public class EmployerDto
{
    public string Email { get; set; } = default!;
    public string RestaurantName { get; set; } = default!;
    public string Location { get; set; } = default!;
    public SubscriptionStatus SubscriptionStatus { get; set; } = default!;
    public SubscriptionPlan SubscriptionPlan { get; set; } = default!;
    public string? RegistrationDate { get; set; }
    public int ActiveJobs { get; set; }
    public int TotalJobs { get; set; }
}
