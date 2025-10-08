using System.Linq.Expressions;
using SharedKernel.BaseEntity;

namespace SharedKernel.Service;
public interface IEntityService<T> where T : IEntity
{
    void Create(T entity, bool save = true);
    Task CreateAsync(T entity, bool save = true);
    void Create(List<T> entities, bool save = true);
    Task CreateAsync(List<T> entities, bool save = true);
    void Delete(T entity, bool save = true);
    IQueryable<T> Get(Expression<Func<T, bool>>? predicate = null, string[]? includes = null);
    void Update(T entity, bool save = true);
    Task UpdateAsync(T entity, bool save = true);
    void UpdateNoTracking(T entity, bool save = true);
    int Count();
    Task<int> CountAsync();
    void Update(IEnumerable<T> entityList, bool save = true);
    Task UpdateAsync(IEnumerable<T> entityList, bool save = true);
    void Save(bool useBulkSave = false);
    Task SaveAsync(bool useBulkSave = false);
    void SaveNoTracking();
    Task SaveNoTrackingAsync();
}
