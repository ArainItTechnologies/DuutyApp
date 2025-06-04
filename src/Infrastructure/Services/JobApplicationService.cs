using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class JobApplicationService : EntityService<JobApplication>, IJobApplicationService
{
    public JobApplicationService(IUnitOfWork unitOfWork, IRepository<JobApplication> repository) : base(unitOfWork, repository)
    {
    }
}
