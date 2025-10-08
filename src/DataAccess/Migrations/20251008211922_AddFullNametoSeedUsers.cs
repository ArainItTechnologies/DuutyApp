using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddFullNametoSeedUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 8, 22, 19, 20, 972, DateTimeKind.Unspecified).AddTicks(5354), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "FullName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "00f79252-5305-4023-8c05-e178d58a6558", "Admin", "AQAAAAIAAYagAAAAEBrl/ik+2q7qwheRKlQcyyZwqToiybSuSkT4TPerq7954mJpjafuku4bWbpN2q+U2A==", "c86e0527-e57e-4dbb-ab25-a09d15480aac" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "FullName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "457b58f4-b418-4076-9c35-ccc2ceecf082", "Employer", "AQAAAAIAAYagAAAAEJNNw/ReWKjQmDA/LmnuQnXTxz5tPVoRTeS1DLe8tSWnvvl/hi2vR+8Hc6XcoREJIA==", "23ae87f8-0d2e-4e7e-b569-bf1d829549bd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "FullName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ca3a753c-f6eb-449a-9a74-2674daab4ed9", "Super Admin", "AQAAAAIAAYagAAAAEMSdNXIglyzNbptbCSzWMu7zBDEwsZjcOjUTrn1C7fClX7r9pcN2TqECNi0+BGSsaQ==", "ab43def6-c90c-46c3-a59f-1cfd64aa602b" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 8, 22, 19, 20, 972, DateTimeKind.Unspecified).AddTicks(5036), new TimeSpan(0, 1, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 7, 29, 9, 8, 30, 820, DateTimeKind.Unspecified).AddTicks(8740), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "FullName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a174db8b-69fb-437e-8547-3f74b77b6606", null, "AQAAAAIAAYagAAAAEISqm7bFs57EVUOe64FkBiJtIKGc4yuuIM5U3btMpj7JU403RzWY74tJS+aGe3/s2g==", "45a65bca-4bcb-4165-b38e-c62114fc093d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "FullName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c9335bb3-37df-41da-afa6-9ed03fe33f7d", null, "AQAAAAIAAYagAAAAEELVIYf9x4NRfBJ2dLvBGtE1HgsLqE+N5edp12alOwn/w90L8p51Oo9k/Ojv2a0IRQ==", "03ae5012-13a4-4cd6-a4b6-a84d6a489f66" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "FullName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f20868cf-b589-4e92-8dee-76b3562f0131", null, "AQAAAAIAAYagAAAAEE6ZeKzzpJ4WcMBwE9HEaE0UZ3X9DAP6EyTBWI2B8TyrceYioRl4Iy+RIljIqrEtBQ==", "cb659be6-b51e-4c7f-95e1-0bfb8a88bcae" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 7, 29, 9, 8, 30, 820, DateTimeKind.Unspecified).AddTicks(8559), new TimeSpan(0, 1, 0, 0, 0)));
        }
    }
}
