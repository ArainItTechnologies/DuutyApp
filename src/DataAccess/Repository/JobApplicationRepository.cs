namespace DataAccess.Repository;

public class JobApplicationRepository: GenericRepository<JobApplication>, IJobApplicationRepository
{
    public JobApplicationRepository(ApplicationDbContext context) : base(context)
    {
    }
}
