using DataAccess.Repository.Interfaces;
using Domain.Entities;

namespace DataAccess.Repository;

public class EmployerRepository : GenericRepository<Employer>, IEmployerRepository
{
    public EmployerRepository(ApplicationDbContext context) : base(context)
    {
    }
}
