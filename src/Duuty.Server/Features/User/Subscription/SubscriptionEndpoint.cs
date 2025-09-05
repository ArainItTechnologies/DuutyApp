using System.Net;
using DataAccess.Identity;
using Domain.Entities;
using Domain.Enums;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using SharedKernel.Services;

namespace Duuty.Server.Features.User.Subscription;

[HttpPost("/api/subscribe")]
[Authorize]
public class SubscriptionEndpoint(UserManager<ArainUser> userManager, IEmployerSubscriptionService service, ITimeProvider timeProvider) : Endpoint<SubscriptionRequest, SubscriptionResponse>
{
    public override async Task HandleAsync(SubscriptionRequest request, CancellationToken ct)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        if (!Enum.IsDefined(typeof(SubscriptionPlan), request.Plan))
        {
            await SendAsync(new SubscriptionResponse(false, null, "Invalid subscription plan."), (int)HttpStatusCode.BadRequest, ct);
            return;
        }

        var now = timeProvider.UtcNow!.Value;
        var expiry = request.Plan switch
        {
            SubscriptionPlan.Monthly => now.AddMonths(1),
            SubscriptionPlan.Quarterly => now.AddMonths(3),
            SubscriptionPlan.Annually => now.AddYears(1),
            SubscriptionPlan.EndToEnd => now.AddYears(1),
            _ => now.AddMonths(1)
        };

        var subscription = new EmployerSubscription
        {
            UserId = user.Id,
            Plan = request.Plan,
            StartDate = now,
            ExpiryDate = expiry,
            
            Status = SubscriptionStatus.Active
        };

        await service.CreateAsync(subscription);

        await SendAsync(new SubscriptionResponse(true, subscription.Id, "Subscription created successfully."), (int)HttpStatusCode.OK, ct);
    }
}

public class SubscriptionRequest
{
    public required string Email { get; set; }
    public SubscriptionPlan Plan { get; set; }
}

public record SubscriptionResponse(bool Success, long? SubscriptionId, string? Message);