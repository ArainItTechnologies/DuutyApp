using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SharedKernel.BaseEntity;
using SharedKernel.Repository;

namespace DataAccess;


public class GenericRepository<T> : IRepository<T> where T : class, IEntity
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;

    public GenericRepository(AppDbContext context)
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

    public IEnumerable<U> FindPartialBy<U>(Expression<Func<T, U>> columns, Expression<Func<T, bool>>? predicate = null)
    {
        var query = _dbSet.AsQueryable();
        if (predicate != null)
            query = query.Where(predicate);
        return query.Select(columns).ToList();
    }

    public T Add(T entity)
    {
        _dbSet.Add(entity);
        return entity;
    }

    public void Add(List<T> entityList) => _dbSet.AddRange(entityList);

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

    public void Save(bool useBulkSave = false)
    {
        _context.SaveChanges();
    }

    public async Task<int> SaveAsync(bool useBulkSave = false)
    {
        return await _context.SaveChangesAsync();
    }

    public int Count() => _dbSet.Count();

    public async Task<int> CountAsync() => await _dbSet.CountAsync();

    public void Remove(T entity) => _dbSet.Remove(entity);
}

