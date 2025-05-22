using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class EmployerService : EntityService<Employer>, IEmployerService
{
    public EmployerService(IUnitOfWork unitOfWork, IRepository<Employer> repository) : base(unitOfWork, repository)
    {
    }
}
