using System.Net;
using DataAccess.Identity;
using Domain.Entities;
using FastEndpoints;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using SharedKernel.Services;

namespace Web.Server.Features.User.BecomeEmployer;

[HttpPost("/user/api/user/become-employer")]
[AllowAnonymous]
public class BecomeEmployerEndpoint(UserManager<ArainUser> userManager, IEmployerService employerService, IAddressService addressService, ITimeProvider timeProvider) : Endpoint<BecomeEmployerRequest>
{
    public override async Task HandleAsync(BecomeEmployerRequest req, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(req.UserId);
        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }
        var addressEntity = new Address
        {
            DateCreated = timeProvider.UtcNow,
            AddressLine1 = req.AddressLine1,
            City = req.City,
            State = req.State,
            Country = req.Country,
            PostalCode = req.PostalCode
        };

        await addressService.CreateAsync(addressEntity);
        await employerService.CreateAsync(new Employer
        {
            UserId = user.Id,
            Email = user.Email!,
            DateCreated = timeProvider.UtcNow,
            LastUpdated = timeProvider.UtcNow,
            Organisation = new Organisation
            {
                OranisationName = req.OrganisationName,
                WebsiteUrl = req.WebsiteUrl,
                DateCreated = timeProvider.UtcNow,
                LastUpdated = timeProvider.UtcNow,
                AddressId = addressEntity.Id,
            }
        });

        var result = await userManager.AddToRoleAsync(user, "Employer");
        if (result.Succeeded)
        {
            await Send.OkAsync((int)HttpStatusCode.OK, ct);
            return;
        }
        await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
    }
}
