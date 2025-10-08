using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class PaymentTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaymentOrder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RazorpayOrderId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Receipt = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LastUpdated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentOrder", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentTransaction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RazorpayPaymentId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RazorpayOrderId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RazorpaySignature = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Method = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentOrderId = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LastUpdated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentTransaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentTransaction_PaymentOrder_PaymentOrderId",
                        column: x => x.PaymentOrderId,
                        principalTable: "PaymentOrder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a174db8b-69fb-437e-8547-3f74b77b6606", "AQAAAAIAAYagAAAAEISqm7bFs57EVUOe64FkBiJtIKGc4yuuIM5U3btMpj7JU403RzWY74tJS+aGe3/s2g==", "45a65bca-4bcb-4165-b38e-c62114fc093d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c9335bb3-37df-41da-afa6-9ed03fe33f7d", "AQAAAAIAAYagAAAAEELVIYf9x4NRfBJ2dLvBGtE1HgsLqE+N5edp12alOwn/w90L8p51Oo9k/Ojv2a0IRQ==", "03ae5012-13a4-4cd6-a4b6-a84d6a489f66" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f20868cf-b589-4e92-8dee-76b3562f0131", "AQAAAAIAAYagAAAAEE6ZeKzzpJ4WcMBwE9HEaE0UZ3X9DAP6EyTBWI2B8TyrceYioRl4Iy+RIljIqrEtBQ==", "cb659be6-b51e-4c7f-95e1-0bfb8a88bcae" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 7, 29, 9, 8, 30, 820, DateTimeKind.Unspecified).AddTicks(8559), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_PaymentOrder_RazorpayOrderId",
                table: "PaymentOrder",
                column: "RazorpayOrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PaymentTransaction_PaymentOrderId",
                table: "PaymentTransaction",
                column: "PaymentOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentTransaction_RazorpayPaymentId",
                table: "PaymentTransaction",
                column: "RazorpayPaymentId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentTransaction");

            migrationBuilder.DropTable(
                name: "PaymentOrder");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 7, 27, 22, 21, 13, 232, DateTimeKind.Unspecified).AddTicks(5405), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "72aea603-e5f6-4f08-85a9-b1e7ee794aa4", "AQAAAAIAAYagAAAAEOO2blkRrx5pSukDsnf8heOvVXJaHMp06c6CXk9+TplxAJPfsBZKtsV1EULJwZUHFw==", "19c4af91-31c3-4f26-bc8e-63694d9c5643" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c7cc92b0-8395-4412-8fab-9616e02e9317", "AQAAAAIAAYagAAAAEIKW0y8cAEh4E6dE2z1MEMJvXLqKFN8G9LJcWDUttD0o4z7UxZxy4Avgpj+Lqt8tuQ==", "a972c323-9f49-4289-966b-f2cbab3aa7e2" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e21a7f0e-acf3-4706-b151-6f3fda186845", "AQAAAAIAAYagAAAAEODCx/lESXKwf84sxb6b+4gvXQRO81Rr6V8LDjLODUEbpwftDG3OI3GW14Srazbj0w==", "546e71d1-557f-4fa1-867c-eff8fd6abe5b" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 7, 27, 22, 21, 13, 232, DateTimeKind.Unspecified).AddTicks(5119), new TimeSpan(0, 1, 0, 0, 0)));
        }
    }
}
