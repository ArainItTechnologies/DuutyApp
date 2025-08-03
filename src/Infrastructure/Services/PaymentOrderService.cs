using Domain.Entities;
using Infrastructure.Services.Interfaces;
using SharedKernel.Repository;

namespace Infrastructure.Services;

public class PaymentOrderService : EntityService<PaymentOrder>, IPaymentOrderService
{
    public PaymentOrderService(IUnitOfWork unitOfWork, IRepository<PaymentOrder> repository) : base(unitOfWork, repository)
    {
    }
}
