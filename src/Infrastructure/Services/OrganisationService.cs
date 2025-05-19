using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;
public class OrganisationService : EntityService<Organisation>, IOrganisationService
{
    public OrganisationService(IUnitOfWork unitOfWork, IRepository<Organisation> repository) : base(unitOfWork, repository)
    {
    }
}
