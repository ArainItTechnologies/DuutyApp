using Domain;
using Microsoft.EntityFrameworkCore;
using SharedKernel.Repository;

namespace Infrastructure.Services;
public class CompanyService : ICompanyService
{
    private readonly IRepository<Company> _companyRepository;

    public CompanyService(IRepository<Company> companyRepository)
    {
        _companyRepository = companyRepository;
    }

    public async Task<IEnumerable<Company>> GetCompaniesAsync()
    {
        return await _companyRepository.Get().ToListAsync();
    }

    public async Task<Company?> GetCompanyByIdAsync(int id)
    {
        return await _companyRepository.Get(c => c.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Company> AddCompanyAsync(Company company)
    {
        _companyRepository.Add(company);
        await _companyRepository.SaveAsync();
        return company;
    }

    public async Task<Company> UpdateCompanyAsync(Company company)
    {
        _companyRepository.Edit(company);
        await _companyRepository.SaveAsync();
        return company;
    }
}

