using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class EmployerProfileService : EntityService<EmployerProfile>, IEmployerProfileService
{
    public EmployerProfileService(IUnitOfWork unitOfWork, IRepository<EmployerProfile> repository) : base(unitOfWork, repository)
    {
    }
}
