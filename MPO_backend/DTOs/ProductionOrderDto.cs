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
    public decimal IWeight1 { get; set; }
    public int IWght1Unit { get; set; }
    public decimal SWeight1 { get; set; }
    public int SWght1Unit { get; set; }
    public decimal SLength1 { get; set; }
    public int SLen1Unit { get; set; }
    public decimal SWidth1 { get; set; }
    public int SWdth1Unit { get; set; }
    public decimal SHeight1 { get; set; }
    public int SHght1Unit { get; set; }

    public List<QualityTestDto> QualityTests { get; set; }
    public List<ProductionOrderItemDto> ProductionOrderItems { get; set; }
}