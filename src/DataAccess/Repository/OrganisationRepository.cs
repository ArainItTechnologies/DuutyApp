using DataAccess;
using DataAccess.Repository;

namespace Domain.Repositories;
public class OrganisationRepository : GenericRepository<Organisation>, IOrganisationRepository
{
    public OrganisationRepository(ApplicationDbContext context) : base(context)
    {
    }
}
