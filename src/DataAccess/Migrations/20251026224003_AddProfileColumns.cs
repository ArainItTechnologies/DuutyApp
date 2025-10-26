using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddProfileColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.UpdateData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 26, 21, 17, 39, 720, DateTimeKind.Unspecified).AddTicks(9357), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cde14a6f-b87b-466c-a3d7-404c23bc69a8", "AQAAAAIAAYagAAAAEIIuc/u7U4z+3azaLTDFCoT81Hzqi5Hdzk6cXkU4cXXSWX8wEtQ3LpZ72w2LnSAiVQ==", "dbd15307-5408-4c72-ab8e-e2984d8fc299" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4129a800-a6b5-4276-a23c-16ac136df976", "AQAAAAIAAYagAAAAEI2fGyoOresi8n9/wmLyfHol6X0C1Qx5mutUhoHlGPPdhASKE1CwtHeZLTVEE2It9g==", "9aa9ca9c-0fb4-434e-82c9-4048a7a25ef8" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fa3d6d1c-8b13-4cbc-96a5-c86e56d3708a", "AQAAAAIAAYagAAAAECI/8xYEdw+okEnfpvWoYETL8TXQevqG8t/ooo9gFG7aHz6Ab0U8pkcuHXY3XZdBiA==", "0c67b5ef-65c0-4511-a824-c7438b2a8d5a" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 26, 21, 17, 39, 720, DateTimeKind.Unspecified).AddTicks(9185), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
