namespace SharedKernel.Services;

public interface ITimeProvider
{
    DateTimeOffset? Now { get; }
    DateTimeOffset? UtcNow { get; }
}
