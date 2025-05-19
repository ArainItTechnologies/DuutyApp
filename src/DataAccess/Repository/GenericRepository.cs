using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SharedKernel.BaseEntity;
using SharedKernel.Repository;

namespace DataAccess.Repository;

public class GenericRepository<T> : IRepository<T> where T : class, IEntity
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> _dbSet;

    public GenericRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public IQueryable<T> Get(Expression<Func<T, bool>>? predicate = null, string[]? includes = null)
    {
        IQueryable<T> query = _dbSet;
        if (includes != null)
        {
            foreach (var include in includes)
                query = query.Include(include);
        }
        return predicate == null ? query : query.Where(predicate);
    }

    public T Add(T entity)
    {
        _dbSet.Add(entity);
        return entity;
    }

    public async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public void Add(List<T> entityList) => _dbSet.AddRange(entityList);

    public async Task AddAsync(List<T> entityList) => await _dbSet.AddRangeAsync(entityList);

    public T Delete(T entity)
    {
        _dbSet.Remove(entity);
        return entity;
    }

    public void Delete(IEnumerable<T> entityList) => _dbSet.RemoveRange(entityList);

    public void Edit(T entity) => _context.Entry(entity).State = EntityState.Modified;

    public void Edit(List<T> entityList)
    {
        foreach (var entity in entityList)
            _context.Entry(entity).State = EntityState.Modified;
    }

    public void Save()
    {
        _context.SaveChanges();
    }

    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public int Count() => _dbSet.Count();

    public async Task<int> CountAsync() => await _dbSet.CountAsync();

    public void Remove(T entity) => _dbSet.Remove(entity);
}

