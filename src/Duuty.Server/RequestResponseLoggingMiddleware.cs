namespace Duuty.Server;

public class RequestResponseLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestResponseLoggingMiddleware> _logger;

    public RequestResponseLoggingMiddleware(RequestDelegate next, ILogger<RequestResponseLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        context.Request.EnableBuffering();
        var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
        context.Request.Body.Position = 0;

        _logger.LogInformation("Request: {Method} {Path} {Body}",
            context.Request.Method, context.Request.Path, requestBody);

        var originalBodyStream = context.Response.Body;
        using var responseBody = new MemoryStream();
        context.Response.Body = responseBody;

        await _next(context);

        context.Response.Body.Seek(0, SeekOrigin.Begin);
        var responseText = await new StreamReader(context.Response.Body).ReadToEndAsync();
        context.Response.Body.Seek(0, SeekOrigin.Begin);

        var statusCode = context.Response.StatusCode;

        if (statusCode >= 500)
        {
            _logger.LogError("Response: {StatusCode} {Method} {Path} {Body}",
                statusCode, context.Request.Method, context.Request.Path, responseText);
        }
        else if (statusCode >= 400)
        {
            _logger.LogWarning("Response: {StatusCode} {Method} {Path} {Body}",
                statusCode, context.Request.Method, context.Request.Path, responseText);
        }

        await responseBody.CopyToAsync(originalBodyStream);
    }
}