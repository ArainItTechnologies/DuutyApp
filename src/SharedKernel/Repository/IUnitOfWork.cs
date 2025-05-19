namespace SharedKernel.Repository;
public interface IUnitOfWork : IDisposable
{
    Task<int> CommitAsync(CancellationToken cancellationToken = default);
    int Commit();
    void SetTrackChanges(bool trackChanges);
}

