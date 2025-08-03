namespace DataAccess.Repository;

public class PaymentOrderRepository : GenericRepository<PaymentOrder>, IPaymentOrderRepository
{
    public PaymentOrderRepository(ApplicationDbContext context) : base(context)
    {
    }
}
