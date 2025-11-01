using DataAccess.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Net;

namespace Web.Server.Features.User.BecomeEmployer;

[HttpPost("/user/api/become-employer")]
[AllowAnonymous]
public class BecomeEmployerEndpoint(UserManager<ArainUser> userManager) : Endpoint<BecomeEmployerRequest>
{
    public override async Task HandleAsync(BecomeEmployerRequest req, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(req.UserId);
        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        var result = await userManager.AddToRoleAsync(user, "Employer");
        if (result.Succeeded)
        {
            await Send.OkAsync((int)HttpStatusCode.OK, ct);
            return;
        }
        await Send.ErrorsAsync((int)HttpStatusCode.BadRequest, ct);
    }
}
