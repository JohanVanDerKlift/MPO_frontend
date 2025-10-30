using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MPO_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddEnumstatustoProductionOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "64f7c7ce-82a9-4cb1-a341-ff03b1c70d17");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a5105651-6b1b-400a-a3f3-24ff2f7a6006");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "QualityTests",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "QualityTests",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "QualityTests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "ProductionOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7ba9d2f5-3258-4734-9dda-8af653f938c7", null, "User", "USER" },
                    { "f1da6b6a-0fb4-43cd-a7af-cf05283eac8f", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7ba9d2f5-3258-4734-9dda-8af653f938c7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f1da6b6a-0fb4-43cd-a7af-cf05283eac8f");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "QualityTests");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "QualityTests");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "QualityTests");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ProductionOrders");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "64f7c7ce-82a9-4cb1-a341-ff03b1c70d17", null, "User", "USER" },
                    { "a5105651-6b1b-400a-a3f3-24ff2f7a6006", null, "Admin", "ADMIN" }
                });
        }
    }
}
