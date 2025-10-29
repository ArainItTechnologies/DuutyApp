using DataAccess.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Duuty.Server.Features.Employer.Profile;

[HttpGet("/api/employer/profile")]
[AllowAnonymous]
public class GetEndpoint(UserManager<ArainUser> userManager) : Endpoint<EmployerProfileRequest, EmployerProfileResponse>
{
    public override async Task HandleAsync(EmployerProfileRequest req, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(req.UserId);
        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }
        
        var response = new EmployerProfileResponse
        {
            UserId = user.Id,
            Phone = user.PhoneNumber,
            Email = user.Email,
            OrganisationName = user.Organisation?.OranisationName ?? "",
            WebsiteUrl = user.Organisation?.WebsiteUrl ?? "",

            AddressLine1 = user.Organisation?.Address?.AddressLine1 ?? "",
            City = user.Organisation?.Address?.City ?? "",
            State = user.Organisation?.Address?.State ?? "",
            Country = user.Organisation?.Address?.Country ?? "India",
            PostalCode = user.Organisation?.Address?.PostalCode ?? "",
        };

        await Send.OkAsync(response, ct);
        return;
    }
}

public class EmployerProfileRequest
{
    public required string UserId { get; set; }
}

public class EmployerProfileResponse
{
    public DateTimeOffset? DateCreated { get; set; }
    public required string UserId { get; set; }
    public string? FullName { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? OrganisationName { get; set; }
    public string? AddressLine1 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? PostalCode { get; set; }
    public string? WebsiteUrl { get; set; }
}