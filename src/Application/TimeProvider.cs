using SharedKernel.Services;

namespace Application;

public class TimeProvider : ITimeProvider
{
    public DateTimeOffset? Now => DateTimeOffset.Now;

    public DateTimeOffset? UtcNow => DateTimeOffset.UtcNow;
}
