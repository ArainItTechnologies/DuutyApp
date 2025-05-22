using DataAccess.Repository.Interfaces;
using Domain.Entities;

namespace DataAccess.Repository;

public class AddressRepository : GenericRepository<Address>, IAddressRepository
{
    public AddressRepository(ApplicationDbContext context) : base(context)
    {
    }
}
