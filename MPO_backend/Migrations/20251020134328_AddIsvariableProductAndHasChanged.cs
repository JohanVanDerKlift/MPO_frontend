using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MPO_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddIsvariableProductAndHasChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7ba9d2f5-3258-4734-9dda-8af653f938c7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f1da6b6a-0fb4-43cd-a7af-cf05283eac8f");

            migrationBuilder.AddColumn<bool>(
                name: "HasChanged",
                table: "ProductionOrders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsVariableProduct",
                table: "ProductionOrders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "38981263-c045-4b4f-a736-6dceb10b0a6a", null, "Admin", "ADMIN" },
                    { "80450026-2208-4f70-889a-6a8c0bca209f", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38981263-c045-4b4f-a736-6dceb10b0a6a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "80450026-2208-4f70-889a-6a8c0bca209f");

            migrationBuilder.DropColumn(
                name: "HasChanged",
                table: "ProductionOrders");

            migrationBuilder.DropColumn(
                name: "IsVariableProduct",
                table: "ProductionOrders");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7ba9d2f5-3258-4734-9dda-8af653f938c7", null, "User", "USER" },
                    { "f1da6b6a-0fb4-43cd-a7af-cf05283eac8f", null, "Admin", "ADMIN" }
                });
        }
    }
}
