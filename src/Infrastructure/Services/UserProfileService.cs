using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class UserProfileService :EntityService<UserProfile>, IUserProfileService
{
    public UserProfileService(IUnitOfWork unitOfWork, IRepository<UserProfile> repository) : base(unitOfWork, repository)
    {
    }
}