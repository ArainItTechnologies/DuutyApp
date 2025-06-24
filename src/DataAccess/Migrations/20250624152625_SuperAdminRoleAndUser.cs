using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class SuperAdminRoleAndUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 6, 24, 16, 26, 25, 40, DateTimeKind.Unspecified).AddTicks(6318), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Name", "NormalizedName" },
                values: new object[] { "B6B2C3G4-E5F6-7890-1234-56789ABCDEF0", null, "Super administrator role with full access to all system features.", "SuperAdmin", "SUPERADMIN" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "97e73ee8-3825-42f7-8983-0192d9279798", "AQAAAAIAAYagAAAAEOhqy9INyKd06h7XYyqr7d/I0NZfnB5xcMiGR5vWr5dX1Ts3Pp6wzL9e3iZ71esk3A==", "a9bcced3-ec7f-465d-84cf-a78a8dca2e29" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c985aa81-6b52-473d-9cec-31c18910f36f", "AQAAAAIAAYagAAAAEMXO1lbLdT0FrGUNyEudw4ub8DQPdb756UFg6tU0aw6HFXpu130B9pQm1l58R1OzzA==", "c891510e-6d39-4b6a-94f5-1fda4b3198c5" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Birthday", "ConcurrencyStamp", "Email", "EmailConfirmed", "FullName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "OrganisationId", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "10000000-0000-0000-0000-000000000003", 0, null, "eeaaacf7-4d81-49b4-bf43-63a009ad345c", "superadmin@duuty.com", true, null, false, null, "SUPERADMIN@DUUTY.COM", "SUPERADMIN@DUUTY.COM", null, "AQAAAAIAAYagAAAAEFgUuMsARCZH3joVOsSFXalOmKI4so7WFsR0ZpW5UH+7h58sujVOUMRp2yT30nHVjQ==", null, false, "bfdecee7-7037-4b6f-a864-aba78821a11d", false, "superadmin@duuty.com" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 6, 24, 16, 26, 25, 40, DateTimeKind.Unspecified).AddTicks(6079), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "B6B2C3G4-E5F6-7890-1234-56789ABCDEF0", "10000000-0000-0000-0000-000000000003" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "B6B2C3G4-E5F6-7890-1234-56789ABCDEF0", "10000000-0000-0000-0000-000000000003" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "B6B2C3G4-E5F6-7890-1234-56789ABCDEF0");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 6, 4, 15, 28, 56, 37, DateTimeKind.Unspecified).AddTicks(232), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "60ebe5c2-3727-460f-a2e3-daab7015e8ac", "AQAAAAIAAYagAAAAECv4Ig/+LRS4/hZc7OBtJhcw7JJ3F/uCm8Ycv6AU7yXRbZnlfDuyblQRIY3PFSoiBg==", "7269efff-1b57-4a1d-8062-b5d00a4b22c1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ccc33ff1-d15d-45e6-b1a5-664f69747df5", "AQAAAAIAAYagAAAAEKMi/omnErezufVMeYg32GdyeWkE1OjLW1u/UCRhz8r5FBvKEC+5YtkK/b0UwutcCw==", "0f0dcab9-2709-462a-8527-9b91a20caf39" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 6, 4, 15, 28, 56, 37, DateTimeKind.Unspecified).AddTicks(56), new TimeSpan(0, 1, 0, 0, 0)));
        }
    }
}
