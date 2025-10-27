using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class PreferredRolesJson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreferredRoles",
                table: "EmployeeJobRoles");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreferredRolesJson",
                table: "EmployeeJobRoles");

            migrationBuilder.AddColumn<string>(
                name: "PreferredRoles",
                table: "EmployeeJobRoles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 26, 22, 40, 2, 343, DateTimeKind.Unspecified).AddTicks(558), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "70251d13-72fe-4121-b363-7056a7028bdb", "AQAAAAIAAYagAAAAEPzvtZRYlr+eaOmL83+MMFAv3s0ftH6o1+ne8KdB0Ynk1n6djwygVJ6bBsFGtSq15w==", "6836ef05-dec1-4a36-88bd-d735cf331bd9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "60f15658-6fb6-4b11-b969-a41f49788e84", "AQAAAAIAAYagAAAAEBi+edA8EbnGbvdFx1NZLitNH1ezBHu+HhSqDYI7DCJA2J4kszFVcLe8p3NAq3g/+A==", "d68c4745-49c0-403d-9978-b41dff3a365c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2d0657a8-a378-4037-a572-9f85b715cd0f", "AQAAAAIAAYagAAAAENI3XCVU9Tq6j/GZhUz/xf819kglCMHW4a4LSmGULASy9biFn/8JmKi0pyMyepOMAA==", "c2ef1dba-a316-4178-90b3-1d2d8e509daa" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 26, 22, 40, 2, 343, DateTimeKind.Unspecified).AddTicks(279), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
