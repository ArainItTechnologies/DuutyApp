using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class EmployeeJobRoleService : EntityService<EmployeeJobRole>, IEmployeeJobRoleService
{
    public EmployeeJobRoleService(IUnitOfWork unitOfWork, IRepository<EmployeeJobRole> repository) : base(unitOfWork, repository)
    {
    }
}
