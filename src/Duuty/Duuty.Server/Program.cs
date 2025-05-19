using Application;
using Infrastructure;
using DataAccess;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHealthChecks();
builder.Services.AddFastEndpoints();

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddDataAccessServices(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHealthChecks("/health");
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapFallbackToFile("/index.html");

app.UseFastEndpoints();
app.Run();
