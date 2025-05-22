using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class AddressService : EntityService<Address>, IAddressService
{
    public AddressService(IUnitOfWork unitOfWork, IRepository<Address> repository) : base(unitOfWork, repository)
    {
    }
}
