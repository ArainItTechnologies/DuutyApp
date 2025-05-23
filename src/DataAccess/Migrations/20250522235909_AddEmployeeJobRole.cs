using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeeJobRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeJobRoles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PreferredRole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LastUpdated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeJobRoles", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 5, 23, 0, 58, 59, 805, DateTimeKind.Unspecified).AddTicks(4984), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "184de7a2-f3dc-4e06-97ad-9074ca75073f", "AQAAAAIAAYagAAAAEMT2mcdlr/8ct4o6xgxE7jS+HXx8y/5McUBAJl0n5V1olstUwiRM2tfCX1Uopka0LA==", "b5c383a0-713d-4333-b7ae-3eefb0e12aad" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3eaccc88-30c4-42ad-b4a7-492d18aa3fe4", "AQAAAAIAAYagAAAAEJ8SCdjpyKB6u9YcUnHoWrK/x2wP1ayUU8UEi5ofCFCtZ+v4jJpY8sKhz0M9e/RyNQ==", "33efa832-bf44-41f5-b3bc-c85f0409334d" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 5, 23, 0, 58, 59, 805, DateTimeKind.Unspecified).AddTicks(3687), new TimeSpan(0, 1, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeJobRoles");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 53, 22, 768, DateTimeKind.Unspecified).AddTicks(2334), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "70afdb4f-f8dd-49a2-bb3d-41e382cd04d0", "AQAAAAIAAYagAAAAEM6T1Qvc5xi6IyZcD/7kSHX9bpfuu20He1ON6BS396cEcOGGYHEfRo1G1M9kgVBDgg==", "742aa90b-b6e5-4d53-a05e-0f4312bfd818" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b88bee9d-d858-4476-b072-ed54616c848c", "AQAAAAIAAYagAAAAEAYLaJytg0G1oPBRARgtmflPsKGBp7i/gHdLLumubIxN2Fo/u2iPyPL5AymejZkujg==", "3d61c234-8377-4c4a-bf5f-164ef0c78f26" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 53, 22, 768, DateTimeKind.Unspecified).AddTicks(1275), new TimeSpan(0, 1, 0, 0, 0)));
        }
    }
}
