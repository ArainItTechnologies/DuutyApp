using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class EmployerSubscriptionService : EntityService<EmployerSubscription>, IEmployerSubscriptionService
{
    public EmployerSubscriptionService(IUnitOfWork unitOfWork, IRepository<EmployerSubscription> repository) : base(unitOfWork, repository)
    {
    }
}
