using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UserProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Availability",
                table: "EmployeeJobRoles");

            migrationBuilder.DropColumn(
                name: "Experience",
                table: "EmployeeJobRoles");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "EmployeeJobRoles");

            migrationBuilder.DropColumn(
                name: "PreferredRolesJson",
                table: "EmployeeJobRoles");

            migrationBuilder.AddColumn<string>(
                name: "PreferredRole",
                table: "EmployeeJobRoles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Availability = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PreferredRolesJson = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "[]"),
                    DateCreated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LastUpdated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 26, 23, 45, 23, 11, DateTimeKind.Unspecified).AddTicks(1853), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cd09ef29-d785-4da1-8ff9-7407b1fe770d", "AQAAAAIAAYagAAAAEAMdumqMVGi/5ugavfRYk1okQnne5s/1UPZf3DN4V8j2MF81qhJ1nvG8U7A4UAwX1g==", "62b2cca0-b832-46de-9434-3f171bd2d3e9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "826ba488-5d88-45d7-a35c-b7aae6264075", "AQAAAAIAAYagAAAAEJo42kM35w7fiol11Z3aprvoFizYFrKgroHxynmLg0TPF8dBbi31GYkTlVoacZgALg==", "3665854e-f959-4ff1-98c9-8565793b901b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0c68e08e-6057-4b20-a350-c3816f18f4ae", "AQAAAAIAAYagAAAAEMBBCTff/MUzENWWGbmpQSyRLqq7wqOz6hxLCRv1QD+ykJNXiiorOzm994BbaefvdQ==", "41f8fbd4-95ab-4140-813c-18625d923ec4" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 26, 23, 45, 23, 11, DateTimeKind.Unspecified).AddTicks(1354), new TimeSpan(0, 0, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "PreferredRole",
                table: "EmployeeJobRoles");

            migrationBuilder.AddColumn<string>(
                name: "Availability",
                table: "EmployeeJobRoles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Experience",
                table: "EmployeeJobRoles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "EmployeeJobRoles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreferredRolesJson",
                table: "EmployeeJobRoles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 26, 23, 10, 36, 885, DateTimeKind.Unspecified).AddTicks(6841), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1b285ae6-ab4b-47b0-a55c-7fd021677242", "AQAAAAIAAYagAAAAEImbUuqC+2wbinwGdHy1Idl5rxLJKKQInqnGUyY2FDFElKFhkMDiXQ8a7oE56aE6Uw==", "59ed7833-a6e0-40cb-803e-20e2274f9651" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a70044e1-3884-4cdd-8cce-73e8e41c78fb", "AQAAAAIAAYagAAAAEIwKlDhu2yBczAB4aOp4hdBXm1XPqL7SiKC5TxuRG21nfsIrPPbhe7XwJSX0JH5XzQ==", "162003e8-48ce-43cb-bbbd-1e4739687486" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ee1b1500-84a7-4f48-888f-15f4380e2a62", "AQAAAAIAAYagAAAAEFAGZ9ZnopyoZRjHyLzCu6e1I399PRnzZDfCQmsz7SEhJv1nxwmWMyuOkzctfLEp8A==", "c1f2c44f-d752-4df2-a27f-4865e3dd6d66" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 26, 23, 10, 36, 885, DateTimeKind.Unspecified).AddTicks(5425), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
