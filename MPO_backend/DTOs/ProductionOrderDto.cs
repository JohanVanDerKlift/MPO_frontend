using MPO_backend.Models;

namespace MPO_backend.DTOs;

public class ProductionOrderDto
{
    public Guid Id { get; set; }
    public long DocNum { get; set; }
    public string ItemCode { get; set; }
    public string ItemName { get; set; }
    public decimal Quantity { get; set; }
    public string CardCode { get; set; }
    public string CardName { get; set; }
    public string Instruction { get; set; }
    public string InstructionFile { get; set; }
    public string WhsName { get; set; }
    public string ProductionText { get; set; }
    public string Comment { get; set; }
    public string TestInstruction { get; set; }
    public bool Photo { get; set; }
    public string Logo { get; set; }
    public DateTime StartDate { get; set; }

    public List<SerialNumberDto> SerialNumbers { get; set; }
    public List<ProductionOrderItemDto> ProductionOrderItems { get; set; }
}