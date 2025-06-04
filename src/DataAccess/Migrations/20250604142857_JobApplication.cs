using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class JobApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobApplications",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    JobListingId = table.Column<long>(type: "bigint", nullable: false),
                    AppliedOn = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LastUpdated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplications", x => x.Id);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_UserId_JobListingId",
                table: "JobApplications",
                columns: new[] { "UserId", "JobListingId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobApplications");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 6, 3, 16, 42, 26, 27, DateTimeKind.Unspecified).AddTicks(4244), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "29930c7a-3788-4dc6-b3b2-d6a8f077f858", "AQAAAAIAAYagAAAAEFtgS+AaXNWkOlE13kdf3NanltytJuW4Kb/tAuHqn5F4M1FBOowTwCq+8nfuGZyKyg==", "71419b23-e687-4785-b36e-8ecf37d15bc2" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "538a841f-d344-4a10-9ced-bed9dfb3c01f", "AQAAAAIAAYagAAAAELKpj59qtdMzcbpo9hPTNoNbKTPRPhmZe6Ojrwh+mqyINWJjix8SXTKBculQ1CvBkA==", "a20dcf0b-8528-4d4f-9e7d-f7176a51b41e" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 6, 3, 16, 42, 26, 27, DateTimeKind.Unspecified).AddTicks(4001), new TimeSpan(0, 1, 0, 0, 0)));
        }
    }
}
