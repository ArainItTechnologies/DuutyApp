using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.DependencyInjection;
using SharedKernel.Services;

namespace Application;

public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddTransient<IEmailSender, EmailSender>();
        services.AddSingleton<ITimeProvider, TimeProvider>();
        return services;
    }
}