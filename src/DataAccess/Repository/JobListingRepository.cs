using DataAccess;
using DataAccess.Repository;
using DataAccess.Repository.Interfaces;
using Domain.Entities;

namespace Domain.Repositories;
public class JobListingRepository : GenericRepository<JobListing>, IJobListingRepository
{
    public JobListingRepository(ApplicationDbContext context) : base(context)
    {
    }
}
