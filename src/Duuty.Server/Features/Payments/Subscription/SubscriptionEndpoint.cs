using DataAccess.Identity;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using SharedKernel.Services;

namespace Duuty.Server.Features.Payments.Subscription;

[HttpPost("/api/payments/subscribe")]
[Authorize]
public class SubscriptionEndpoint(UserManager<ArainUser> userManager, IEmployerSubscriptionService service, ITimeProvider timeProvider) : Endpoint<SubscriptionRequest, SubscriptionResponse>
{
    public override async Task HandleAsync(SubscriptionRequest request, CancellationToken ct)
    {
        try
        {
            var user = await userManager.FindByIdAsync(request.UserId);
            if (user is null)
            {
                await Send.NotFoundAsync(ct);
                return;
            }

            if (!Enum.IsDefined(typeof(SubscriptionPlan), request.Plan))
            {
                await Send.NotFoundAsync(ct);
                return;
            }


            var now = timeProvider.UtcNow!.Value;
            var planSettings = request.Plan switch
            {
                SubscriptionPlan.Monthly => new PlanSettings(now.AddMonths(1), 10),
                SubscriptionPlan.Quarterly => new PlanSettings(now.AddMonths(3), 30),
                SubscriptionPlan.Annually => new PlanSettings(now.AddYears(1), 50),
                SubscriptionPlan.EndToEnd => new PlanSettings(now.AddYears(1), 200),
                _ => new PlanSettings(now.AddMonths(1), 10)
            };

            // Check for existing subscription for this user
            var existing = service.Get(x => x.UserId == user.Id).FirstOrDefault();

            if (existing is not null)
            {
                var isActive = existing.Status == SubscriptionStatus.Active && existing.ExpiryDate > now;

                // If same active plan already exists -> reject
                if (existing.Plan == request.Plan && isActive)
                {
                    AddError("SUBSCRIPTION_ALREADY_EXISTS", "An active subscription with the same plan already exists.");
                    await Send.ErrorsAsync((int)System.Net.HttpStatusCode.BadRequest, ct);
                    return;
                }

                // Different plan (upgrade/downgrade) or existing expired -> update the subscription
                existing.Plan = request.Plan;
                existing.StartDate = now;
                existing.ExpiryDate = planSettings.ExpiryDate;
                existing.RemainingToView = planSettings.RemainingToView;
                existing.Status = SubscriptionStatus.Active;

                await service.UpdateAsync(existing);

                await Send.OkAsync(new SubscriptionResponse(true, existing.Id, "Subscription updated successfully."), ct);
                return;
            }

            var subscription = new EmployerSubscription
            {
                UserId = user.Id,
                Plan = request.Plan,
                StartDate = now,
                ExpiryDate = planSettings.ExpiryDate,
                RemainingToView = planSettings.RemainingToView,
                Status = SubscriptionStatus.Active
            };

            await service.CreateAsync(subscription);

            await Send.OkAsync(new SubscriptionResponse(true, subscription.Id, "Subscription created successfully."), ct);
        }
        catch (Exception ex)
        {
            AddError(ex.Message);
            await Send.ErrorsAsync((int)System.Net.HttpStatusCode.InternalServerError, ct);
            return;
        }

    }
}

public class SubscriptionRequest
{
    public required string UserId { get; set; }
    public SubscriptionPlan Plan { get; set; }
}

public record SubscriptionResponse(bool Success, long? SubscriptionId, string? Message);

public record PlanSettings(DateTimeOffset ExpiryDate, int RemainingToView);