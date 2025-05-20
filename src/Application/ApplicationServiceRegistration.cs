using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SharedKernel.Configs;
using SharedKernel.Services;

namespace Application;

public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<SmtpConfig>(configuration.GetSection("SmtpConfig"));
        services.AddTransient<IEmailSender, EmailSender>();
        services.AddSingleton<ITimeProvider, TimeProvider>();
        return services;
    }
}