using DataAccess;
using FastEndpoints.Swagger;
using Infrastructure;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHealthChecks();
builder.Services
    .AddFastEndpoints()
    .SwaggerDocument()
    .AddApplicationServices(builder.Configuration)
    .AddInfrastructureServices(builder.Configuration)
    .AddDataAccessServices(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}

app.MapHealthChecks("/health");
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapFallbackToFile("/index.html");

app.UseFastEndpoints(
    c => c.Errors.UseProblemDetails(
        x =>
        {
            x.AllowDuplicateErrors = true;
            x.IndicateErrorCode = true;
            x.IndicateErrorSeverity = true;
            x.TypeValue = "https://www.rfc-editor.org/rfc/rfc7231#section-6.5.1";
            x.TitleValue = "One or more validation errors occurred.";
            x.TitleTransformer = pd => pd.Status switch
            {
                400 => "Validation Error",
                404 => "Not Found",
                _ => "One or more errors occurred!"
            };
        }))
    .UseSwaggerGen();
app.Run();
