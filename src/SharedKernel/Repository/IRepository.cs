using System.Linq.Expressions;
using SharedKernel.BaseEntity;

namespace SharedKernel.Repository;

public interface IRepository<T> where T : IEntity
{
    IQueryable<T> Get(Expression<Func<T, bool>>? predicate = null, string[]? includes = null);
    T Add(T entity);
    Task<T> AddAsync(T entity);
    void Add(List<T> entityList);
    Task AddAsync(List<T> entityList);
    T Delete(T entity);
    void Delete(IEnumerable<T> entityList);
    void Edit(T entity);
    void Edit(List<T> entityList);
    void Save();
    int Count();
    Task<int> CountAsync();
    void Remove(T entity);
}
