using MPO_backend.Models;

namespace MPO_backend.DTOs;

public class ProductionOrderListDto
{
    public Guid Id { get; set; }
    public long DocNum { get; set; }
    public string ItemCode { get; set; }
    public string ItemName { get; set; }
    public decimal Quantity { get; set; }
    public string CardCode { get; set; }
    public string CardName { get; set; }
    public string ProductionText { get; set; }
    public DateTime StartDate { get; set; }
    public Status Status { get; set; }
}