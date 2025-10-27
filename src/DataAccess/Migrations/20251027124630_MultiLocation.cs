using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class MultiLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "UserProfiles");

            migrationBuilder.AddColumn<string>(
                name: "LocattionsJson",
                table: "UserProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 27, 12, 46, 29, 319, DateTimeKind.Unspecified).AddTicks(4690), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a3373a1e-d8a0-485f-8651-fe6d3c884733", "AQAAAAIAAYagAAAAEGmjI6PCVdQHlXGmaIsPF6zZSi+DyGqV+6SrdnF3VvtsywIme2WTyB2X3FgGTPcT5Q==", "5e418770-dd28-4e76-9374-36b92df8b88d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0b53f018-e0ef-4305-a962-27e57b833d79", "AQAAAAIAAYagAAAAEOLXoffIM5przrIMEQ/tB/5J++4Rk9M78xThEaweS25f53A/ePeCcENoV0DRkx5SUg==", "edb5c619-a98c-46a7-b4e7-e853a2096529" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a7996f3e-8b97-42b9-a664-e543d3c10638", "AQAAAAIAAYagAAAAENil80iPUkYRBSljAfwMZMfGHbO8WAJ0gMcf2m92HgpdVa5OwhT6ff5hhCI3xID9rQ==", "91803c5a-43f6-403f-a576-4d451b98a580" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 27, 12, 46, 29, 319, DateTimeKind.Unspecified).AddTicks(4502), new TimeSpan(0, 0, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocattionsJson",
                table: "UserProfiles");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "UserProfiles",
                type: "nvarchar(max)",
                nullable: true);

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
    }
}
