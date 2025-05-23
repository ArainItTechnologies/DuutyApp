namespace Web.Server.Features.User.BecomeEmployer;

public class BecomeEmployerRequest
{
    public required string OrganisationName { get; set; }
    public required string AddressLine1 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string Country { get; set; }
    public required string PostalCode { get; set; }
    public required string UserId { get; set; }
}