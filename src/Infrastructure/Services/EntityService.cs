using System.Linq.Expressions;
using SharedKernel.BaseEntity;
using SharedKernel.Repository;
using SharedKernel.Service;

namespace Infrastructure.Services;

public class EntityService<T> : IEntityService<T> where T : Entity
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<T> _repository;

    public EntityService(IUnitOfWork unitOfWork, IRepository<T> repository)
    {
        _unitOfWork = unitOfWork;
        _repository = repository;
    }

    public void Create(T entity, bool save = true)
    {
        _repository.Add(entity);
        if (save)
        {
            _unitOfWork.Commit();
        }
    }

    public async Task CreateAsync(T entity, bool save = true)
    {
        await _repository.AddAsync(entity);
        if (save)
        {
            await _unitOfWork.CommitAsync();
        }
    }

    public void Create(List<T> entities, bool save = true)
    {
        foreach (var entity in entities)
        {
            _repository.AddAsync(entity).Wait();
        }
        if (save)
        {
            _unitOfWork.Commit();
        }
    }

    public async Task CreateAsync(List<T> entities, bool save = true)
    {
        foreach (var entity in entities)
        {
            await _repository.AddAsync(entity);
        }
        if (save)
        {
            await _unitOfWork.CommitAsync();
        }
    }

    public void Delete(T entity, bool save = true)
    {
        _repository.Remove(entity);
        if (save)
        {
            _unitOfWork.Commit();
        }
    }

    public IQueryable<T> Get(Expression<Func<T, bool>>? predicate = null, string[]? includes = null)
    {
        return _repository.Get(predicate, includes);
    }

    public void Update(T entity, bool save = true)
    {
        _repository.Edit(entity);
        if (save)
        {
            _unitOfWork.Commit();
        }
    }
    
    public async Task UpdateAsync(T entity, bool save = true)
    {
        _repository.Edit(entity);
        if (save)
        {
            await _unitOfWork.CommitAsync();
        }
    }

    public void SaveNoTracking()
    {
        _unitOfWork.SetTrackChanges(trackChanges: false);
        _unitOfWork.Commit();
        _unitOfWork.SetTrackChanges(trackChanges: true);
    }

    public async Task SaveNoTrackingAsync()
    {
        _unitOfWork.SetTrackChanges(trackChanges: false);
        await _unitOfWork.CommitAsync();
        _unitOfWork.SetTrackChanges(trackChanges: true);
    }

    public void UpdateNoTracking(T entity, bool save = true)
    {
        _repository.Edit(entity);
        if (save)
        {
            _unitOfWork.SetTrackChanges(trackChanges: false);
            _unitOfWork.Commit();
            _unitOfWork.SetTrackChanges(trackChanges: true);
        }
    }

    public int Count()
    {
        return _repository.Count();
    }

    public async Task<int> CountAsync()
    {
        return await _repository.CountAsync();
    }

    public void Update(IEnumerable<T> entityList, bool save = true)
    {
        foreach (var entity in entityList)
        {
            _repository.Edit(entity);
        }
        if (save)
        {
            _unitOfWork.Commit();
        }
    }

    public async Task UpdateAsync(IEnumerable<T> entityList, bool save = true)
    {
        foreach (var entity in entityList)
        {
            _repository.Edit(entity);
        }
        if (save)
        {
            await _unitOfWork.CommitAsync();
        }
    }

    public void Save(bool useBulkSave = false)
    {
        _unitOfWork.CommitAsync().Wait();
    }

    public async Task SaveAsync(bool useBulkSave = false)
    {
        await _unitOfWork.CommitAsync();
    }
}