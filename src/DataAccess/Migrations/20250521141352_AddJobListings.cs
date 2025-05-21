using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddJobListings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobListings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobState = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Requirements = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Benefits = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobType = table.Column<int>(type: "int", nullable: false),
                    SalaryRange = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatePosted = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    ApplicationDeadline = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    EmployerId = table.Column<long>(type: "bigint", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LastUpdated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobListings", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 15, 13, 51, 479, DateTimeKind.Unspecified).AddTicks(1864), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ccff4026-0fe7-49f9-b4f9-123db1337e1a", "AQAAAAIAAYagAAAAEM9M4Il4xOecX+JchVaEXHIu2wHM3L1NEKNs8eOTpg4WfajldIZV3Zc/k9P3iglbHQ==", "3ab9f77f-e0c7-4d70-ac2e-4b952d8cd89e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1d601150-a8b9-4220-8fc7-810157cf008c", "AQAAAAIAAYagAAAAEEUtGSXuuaMERFrzptwcrxECiyjGbdyQDlJ2Eib7SWhfHi/++wDm0bebEBRlu0NO4w==", "034cdd12-310d-4b6c-96a1-30aed5bce758" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 15, 13, 51, 479, DateTimeKind.Unspecified).AddTicks(1657), new TimeSpan(0, 1, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobListings");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 23, 29, 2, 214, DateTimeKind.Unspecified).AddTicks(3419), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a7c067e9-745d-4745-aee7-f13f94575421", "AQAAAAIAAYagAAAAEL7FrWXRyBiEVRbPlS3mB/hwDLvw0TBiDuJsmhGR+ji6w6XWWjUA/IZ80XMb0Pz5QQ==", "4202cee0-977f-4752-9da8-69e12eb62274" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "94469454-b394-43e3-9f33-7a9c96895c55", "AQAAAAIAAYagAAAAEHsC6N8WZ1i9dL7lJQyaX3CHY72hYWo46Z5kT9l1Mg94XdbHE7r38aYIWZDnVDFROQ==", "25d56b68-dc7d-4ce3-ba05-04f04a56eaf8" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 23, 29, 2, 214, DateTimeKind.Unspecified).AddTicks(2951), new TimeSpan(0, 1, 0, 0, 0)));
        }
    }
}
