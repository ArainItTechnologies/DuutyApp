using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class PaymentTransactionService : EntityService<PaymentTransaction>, IPaymentTransactionService
{
    public PaymentTransactionService(IUnitOfWork unitOfWork, IRepository<PaymentTransaction> repository) : base(unitOfWork, repository)
    {
    }
}
