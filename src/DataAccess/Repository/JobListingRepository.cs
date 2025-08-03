using DataAccess;
using DataAccess.Repository;

namespace Domain.Repositories;
public class JobListingRepository : GenericRepository<JobListing>, IJobListingRepository
{
    public JobListingRepository(ApplicationDbContext context) : base(context)
    {
    }
}
