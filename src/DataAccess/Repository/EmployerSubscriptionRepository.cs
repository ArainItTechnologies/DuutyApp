using DataAccess.Repository.Interfaces;
using Domain.Entities;

namespace DataAccess.Repository;

public class EmployerSubscriptionRepository : GenericRepository<EmployerSubscription>, IEmployerSubscriptionRepository
{
    public EmployerSubscriptionRepository(ApplicationDbContext context) : base(context)
    {
    }
}
