using Application;
using DataAccess;
using FastEndpoints;
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

app.UseFastEndpoints()
    .UseSwaggerGen();
app.Run();
