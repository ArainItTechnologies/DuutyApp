using SharedKernel.Repository;

namespace DataAccess.Repository;
public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public int Commit()
    {
       return _context.SaveChanges();
    }

    public async Task<int> CommitAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    public void SetTrackChanges(bool trackChanges)
    {
        _context.ChangeTracker.AutoDetectChangesEnabled = trackChanges;
    }
}

