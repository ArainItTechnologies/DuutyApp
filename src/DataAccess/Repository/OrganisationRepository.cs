using DataAccess;
using DataAccess.Repository.Interfaces;
using Domain.Entities;

namespace Domain.Repositories;
public class OrganisationRepository : GenericRepository<Organisation>, IOrganisationRepository
{
    public OrganisationRepository(ApplicationDbContext context) : base(context)
    {
    }
}
