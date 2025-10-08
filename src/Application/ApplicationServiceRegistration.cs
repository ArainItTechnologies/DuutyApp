using System.Net.Http.Headers;
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
        services.AddSingleton<IMessageService, MessageService>();

        services.AddHttpClient<IMessageService, MessageService>(client =>
        {
            var config = configuration.GetSection("WhatsAppConfig").Get<WhatsAppConfig>();
            client.BaseAddress = new Uri($"https://graph.facebook.com/v22.0/{config!.PhoneNumberId}/messages");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", config!.ApiKey);
            client.DefaultRequestHeaders.Add("User-Agent", "WhatsAppAuthSender/1.0");
        });

        return services;
    }
}