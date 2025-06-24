using DataAccess.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.SeedConfiguration;

public class UserConfiguration : IEntityTypeConfiguration<ArainUser>
{
    public void Configure(EntityTypeBuilder<ArainUser> builder)
    {
        var hasher = new PasswordHasher<ArainUser>();

        var adminUser = new ArainUser
        {
            Id = DuutySeedConstants.AdminUserId,
            UserName = "admin@duuty.in",
            NormalizedUserName = "ADMIN@DUUTY.IN",
            Email = "admin@duuty.in",
            NormalizedEmail = "ADMIN@DUUTY.IN",
            EmailConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString("D")
        };
        adminUser.PasswordHash = hasher.HashPassword(adminUser, "Admin@123");

        var employerUser = new ArainUser
        {
            Id = DuutySeedConstants.EmployerUserId,
            UserName = "employer@duuty.com",
            NormalizedUserName = "EMPLOYER@DUUTY.COM",
            Email = "employer@duuty.com",
            NormalizedEmail = "EMPLOYER@DUUTY.COM",
            EmailConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString("D")
        };
        employerUser.PasswordHash = hasher.HashPassword(employerUser, "Employer@123");

        var superAdminUser = new ArainUser
        {
            Id = DuutySeedConstants.SuperAdminUserId,
            UserName = "superadmin@duuty.com",
            NormalizedUserName = "SUPERADMIN@DUUTY.COM",
            Email = "superadmin@duuty.com",
            NormalizedEmail = "SUPERADMIN@DUUTY.COM",
            EmailConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString("D")
        };
        superAdminUser.PasswordHash = hasher.HashPassword(superAdminUser, "SuperAdmin@123");

        builder.HasData(superAdminUser, adminUser, employerUser);
    }
}

