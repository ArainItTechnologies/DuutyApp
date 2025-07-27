using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Subscription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "JobPostLimit",
                table: "Subscriptions",
                newName: "RemainingToView");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Subscriptions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "EmployerSubscriptionId",
                table: "Employers",
                type: "bigint",
                nullable: true);

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
                columns: new[] { "ConcurrencyStamp", "Email", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "c7cc92b0-8395-4412-8fab-9616e02e9317", "employer@duuty.in", "EMPLOYER@DUUTY.IN", "EMPLOYER@DUUTY.IN", "AQAAAAIAAYagAAAAEIKW0y8cAEh4E6dE2z1MEMJvXLqKFN8G9LJcWDUttD0o4z7UxZxy4Avgpj+Lqt8tuQ==", "a972c323-9f49-4289-966b-f2cbab3aa7e2", "employer@duuty.in" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "Email", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "e21a7f0e-acf3-4706-b151-6f3fda186845", "superadmin@duuty.in", "SUPERADMIN@DUUTY.IN", "SUPERADMIN@DUUTY.IN", "AQAAAAIAAYagAAAAEODCx/lESXKwf84sxb6b+4gvXQRO81Rr6V8LDjLODUEbpwftDG3OI3GW14Srazbj0w==", "546e71d1-557f-4fa1-867c-eff8fd6abe5b", "superadmin@duuty.in" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 7, 27, 22, 21, 13, 232, DateTimeKind.Unspecified).AddTicks(5119), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_Employers_EmployerSubscriptionId",
                table: "Employers",
                column: "EmployerSubscriptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employers_Subscriptions_EmployerSubscriptionId",
                table: "Employers",
                column: "EmployerSubscriptionId",
                principalTable: "Subscriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employers_Subscriptions_EmployerSubscriptionId",
                table: "Employers");

            migrationBuilder.DropIndex(
                name: "IX_Employers_EmployerSubscriptionId",
                table: "Employers");

            migrationBuilder.DropColumn(
                name: "EmployerSubscriptionId",
                table: "Employers");

            migrationBuilder.RenameColumn(
                name: "RemainingToView",
                table: "Subscriptions",
                newName: "JobPostLimit");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Subscriptions",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 7, 7, 15, 41, 53, 18, DateTimeKind.Unspecified).AddTicks(9408), new TimeSpan(0, 1, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6c80cae8-fa91-430a-ad0a-6ed2286e4a2a", "AQAAAAIAAYagAAAAEHh5/3/NSG5CKDl8QvMilT+6ZqgXDSQEo8xj9pC2hhO8wS+MjBAXyYB3x1M9vN+39g==", "95072af5-1467-453c-abb1-e0fbd1c95b73" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "Email", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "37072726-ec68-429e-b0f1-9597f6492d67", "employer@duuty.com", "EMPLOYER@DUUTY.COM", "EMPLOYER@DUUTY.COM", "AQAAAAIAAYagAAAAEEqP6jB12JhR772/0CCXKdWskdMCLQ23kNbQyKsVif/fgQTSMpAdCEI4Vx7YdIx3BQ==", "a87dedc0-b01b-47e2-b1ad-4d90993fb1af", "employer@duuty.com" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "Email", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp", "UserName" },
                values: new object[] { "f2e39e82-d1b4-4bdb-8392-187f02cd5a6c", "superadmin@duuty.com", "SUPERADMIN@DUUTY.COM", "SUPERADMIN@DUUTY.COM", "AQAAAAIAAYagAAAAEN7nRsNlhpq8iFJCHeYagYdAVfs5hw50ngKfyHZiBJONijYMtyIVzUnAcsQkp89XlQ==", "2678e270-aec7-41b3-aaa2-f668d55fbe6e", "superadmin@duuty.com" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 7, 7, 15, 41, 53, 18, DateTimeKind.Unspecified).AddTicks(9116), new TimeSpan(0, 1, 0, 0, 0)));
        }
    }
}
