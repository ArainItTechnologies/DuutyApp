namespace SharedKernel.Service;

public interface ITimeProvider
{
    DateTimeOffset? Now { get; set; }
    DateTimeOffset? UtcNow { get; set; }
}
