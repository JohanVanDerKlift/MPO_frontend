namespace MPO_backend.DTOs;

public class CreateProductionOrderDto
{
    public long DocNum { get; set; }
    public string ProdItemCode { get; set; }
    public string ProdItemName { get; set; }
    public decimal Quantity { get; set; }
    public string CardCode { get; set; }
    public string CardName { get; set; }
    public string Instruction { get; set; }
    public string InstructionFile { get; set; }
    public string WhsName { get; set; }
    public string ProductionText { get; set; }
    public string Comment { get; set; }
    public string ProdTestInstruction { get; set; }
    public bool Photo { get; set; }
    public string Logo { get; set; }
    public DateTime StartDate { get; set; }
    
    public string ItemCode { get; set; }
    public string ItemName { get; set; }
    public string SuppCatNum { get; set; }
    public string Remark { get; set; }
    public string TestInstruction { get; set; }
}