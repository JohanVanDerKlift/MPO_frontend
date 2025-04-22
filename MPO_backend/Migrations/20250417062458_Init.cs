using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MPO_backend.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductionOrders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocNum = table.Column<long>(type: "bigint", nullable: false),
                    ProdItemCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdItemName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CardCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CardName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instruction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InstructionFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WhsName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductionText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdTestInstruction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Photo = table.Column<bool>(type: "bit", nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionOrders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductionOrderItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SuppCatNum = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instruction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductionOrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionOrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductionOrderItems_ProductionOrders_ProductionOrderId",
                        column: x => x.ProductionOrderId,
                        principalTable: "ProductionOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SerialNumbers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductionNumber = table.Column<long>(type: "bigint", nullable: false),
                    SerialNo = table.Column<long>(type: "bigint", nullable: false),
                    ProductionOrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SerialNumbers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SerialNumbers_ProductionOrders_ProductionOrderId",
                        column: x => x.ProductionOrderId,
                        principalTable: "ProductionOrders",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "QualityTests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MechanicalTest = table.Column<bool>(type: "bit", nullable: false),
                    VisualTest = table.Column<bool>(type: "bit", nullable: false),
                    ElectricalTest = table.Column<bool>(type: "bit", nullable: false),
                    OperationalTest = table.Column<bool>(type: "bit", nullable: false),
                    TestResult = table.Column<bool>(type: "bit", nullable: false),
                    SerialNumberId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QualityTests_SerialNumbers_SerialNumberId",
                        column: x => x.SerialNumberId,
                        principalTable: "SerialNumbers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductionOrderItems_ProductionOrderId",
                table: "ProductionOrderItems",
                column: "ProductionOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_QualityTests_SerialNumberId",
                table: "QualityTests",
                column: "SerialNumberId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SerialNumbers_ProductionOrderId",
                table: "SerialNumbers",
                column: "ProductionOrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductionOrderItems");

            migrationBuilder.DropTable(
                name: "QualityTests");

            migrationBuilder.DropTable(
                name: "SerialNumbers");

            migrationBuilder.DropTable(
                name: "ProductionOrders");
        }
    }
}
