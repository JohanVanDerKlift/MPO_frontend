using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MPO_backend.Migrations
{
    /// <inheritdoc />
    public partial class EditSerialNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SerialNumbers_ProductionOrders_ProductionOrderId",
                table: "SerialNumbers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6920cd20-330b-42d6-97b6-558f65bde7ec");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbc2ffe9-daf0-43e5-ab98-3d5f6d127912");

            migrationBuilder.DropColumn(
                name: "ProductionNumber",
                table: "SerialNumbers");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductionOrderId",
                table: "SerialNumbers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4b8f702b-4ac0-405b-aef7-1b4c492498c0", null, "Admin", "ADMIN" },
                    { "f5048166-5290-4c81-a955-224a31c8e8a2", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_SerialNumbers_ProductionOrders_ProductionOrderId",
                table: "SerialNumbers",
                column: "ProductionOrderId",
                principalTable: "ProductionOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SerialNumbers_ProductionOrders_ProductionOrderId",
                table: "SerialNumbers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b8f702b-4ac0-405b-aef7-1b4c492498c0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5048166-5290-4c81-a955-224a31c8e8a2");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductionOrderId",
                table: "SerialNumbers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<long>(
                name: "ProductionNumber",
                table: "SerialNumbers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6920cd20-330b-42d6-97b6-558f65bde7ec", null, "User", "USER" },
                    { "bbc2ffe9-daf0-43e5-ab98-3d5f6d127912", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_SerialNumbers_ProductionOrders_ProductionOrderId",
                table: "SerialNumbers",
                column: "ProductionOrderId",
                principalTable: "ProductionOrders",
                principalColumn: "Id");
        }
    }
}
