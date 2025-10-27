using System.Text.Json;
using DataAccess.Identity;
using DataAccess.SeedConfiguration;
using Domain.Enums;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class ApplicationDbContext : IdentityDbContext<ArainUser, ArainRole, string>
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Organisation> Organisations { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<EmployerSubscription> Subscriptions { get; set; }
    public DbSet<JobListing> JobListings { get; set; }
    public DbSet<Employer> Employers { get; set; }
    public DbSet<EmployeeJobRole> EmployeeJobRoles { get; set; }
    public DbSet<JobApplication> JobApplications { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.Property(e => e.PreferredRolesJson)
                  .HasColumnType("nvarchar(max)")
                  .HasDefaultValue("[]")
                  .IsRequired();
        });

        modelBuilder.Entity<EmployerSubscription>(entity =>
        {
            entity.Property(e => e.Plan)
                .HasConversion(
                    v => v.ToString(),
                    v => (SubscriptionPlan)Enum.Parse(typeof(SubscriptionPlan), v));

            entity.Property(e => e.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (SubscriptionStatus)Enum.Parse(typeof(SubscriptionStatus), v));

            entity.Property(e => e.StartDate).IsRequired();
            entity.Property(e => e.ExpiryDate).IsRequired();
        });

        modelBuilder.Entity<JobApplication>()
            .HasIndex(a => new { a.UserId, a.JobListingId })
            .IsUnique();

        modelBuilder.Entity<Employer>()
            .HasOne(e => e.EmployerSubscription)
            .WithMany(s => s.Employers)
            .HasForeignKey(e => e.EmployerSubscriptionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PaymentOrder>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.RazorpayOrderId).HasMaxLength(100);
            entity.Property(e => e.Receipt).HasMaxLength(40);
            entity.HasIndex(e => e.RazorpayOrderId).IsUnique();
        });

        modelBuilder.Entity<PaymentTransaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.RazorpayPaymentId).HasMaxLength(100);
            entity.HasIndex(e => e.RazorpayPaymentId).IsUnique();

            entity.HasOne(d => d.PaymentOrder)
                  .WithMany(p => p.Transactions)
                  .HasForeignKey(d => d.PaymentOrderId);
        });

        modelBuilder.ApplyConfiguration(new OrganisationConfiguration());
        modelBuilder.ApplyConfiguration(new AddressConfiguration());
        modelBuilder.ApplyConfiguration(new RoleConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new UserRoleConfiguration());
    }
}
