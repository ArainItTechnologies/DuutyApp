using Domain;

namespace Infrastructure.Services;

public interface ICompanyService
{
    Task<IEnumerable<Company>> GetCompaniesAsync();
    Task<Company?> GetCompanyByIdAsync(int id);
    Task<Company> AddCompanyAsync(Company company);
    Task<Company> UpdateCompanyAsync(Company company);
}
