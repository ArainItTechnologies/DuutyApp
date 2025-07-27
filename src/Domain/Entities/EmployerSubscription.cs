using System.ComponentModel.DataAnnotations;
using Domain.Enums;
using SharedKernel.BaseEntity;

namespace Domain.Entities;

public class EmployerSubscription : Entity
{
    [Key]
    public long Id { get; set; }

    public required string UserId { get; set; }

    public SubscriptionPlan Plan { get; set; }

    public int ActiveJobs
    {
        get
        {
            return Plan switch
            {
                SubscriptionPlan.Monthly => 2,
                SubscriptionPlan.Quarterly => 3,
                SubscriptionPlan.Annually => 6,
                SubscriptionPlan.EndToEnd => 10,
                _ => 1
            };
        }
    }

    public int RemainingToView { get; set; }
    public int TotalContactsToView
    {
        get
        {
            return Plan switch
            {
                SubscriptionPlan.Monthly => 100,
                SubscriptionPlan.Quarterly => 350,
                SubscriptionPlan.Annually => 900,
                SubscriptionPlan.EndToEnd => 1500,
                _ => 0,
            };
        }
    }

    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset ExpiryDate { get; set; }

    public required SubscriptionStatus Status { get; set; }

    public virtual ICollection<Employer> Employers { get; set; } = new List<Employer>();
}

