﻿using Microsoft.AspNetCore.Authorization;

namespace Web.Server.Features.Public;

[HttpGet("/secure-endpoint")]
[Authorize(Roles = "Admin,User")]
public class SecureEndpoint : EndpointWithoutRequest<string>
{
    public override async Task HandleAsync(CancellationToken ct)
    {
        await Send.UnauthorizedAsync(ct);
    }
}

