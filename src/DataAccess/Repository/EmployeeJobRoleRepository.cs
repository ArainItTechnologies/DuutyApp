namespace DataAccess.Repository;

public class EmployeeJobRoleRepository : GenericRepository<EmployeeJobRole>, IEmployeeJobRoleRepository
{
    public EmployeeJobRoleRepository(ApplicationDbContext context) : base(context)
    {
    }
}

