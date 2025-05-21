using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class JobListingService : EntityService<JobListing>, IJobListingService
{
    public JobListingService(IUnitOfWork unitOfWork, IRepository<JobListing> repository) : base(unitOfWork, repository)
    {
    }
}
