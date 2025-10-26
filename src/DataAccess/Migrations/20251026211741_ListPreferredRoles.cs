using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ListPreferredRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PreferredRole",
                table: "EmployeeJobRoles",
                newName: "PreferredRoles");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PreferredRoles",
                table: "EmployeeJobRoles",
                newName: "PreferredRole");

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
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "00f79252-5305-4023-8c05-e178d58a6558", "AQAAAAIAAYagAAAAEBrl/ik+2q7qwheRKlQcyyZwqToiybSuSkT4TPerq7954mJpjafuku4bWbpN2q+U2A==", "c86e0527-e57e-4dbb-ab25-a09d15480aac" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "457b58f4-b418-4076-9c35-ccc2ceecf082", "AQAAAAIAAYagAAAAEJNNw/ReWKjQmDA/LmnuQnXTxz5tPVoRTeS1DLe8tSWnvvl/hi2vR+8Hc6XcoREJIA==", "23ae87f8-0d2e-4e7e-b569-bf1d829549bd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ca3a753c-f6eb-449a-9a74-2674daab4ed9", "AQAAAAIAAYagAAAAEMSdNXIglyzNbptbCSzWMu7zBDEwsZjcOjUTrn1C7fClX7r9pcN2TqECNi0+BGSsaQ==", "ab43def6-c90c-46c3-a59f-1cfd64aa602b" });

            migrationBuilder.UpdateData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateCreated",
                value: new DateTimeOffset(new DateTime(2025, 10, 8, 22, 19, 20, 972, DateTimeKind.Unspecified).AddTicks(5036), new TimeSpan(0, 1, 0, 0, 0)));
        }
    }
}
