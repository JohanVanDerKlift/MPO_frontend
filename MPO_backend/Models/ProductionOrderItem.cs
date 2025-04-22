using System.Text.Json.Serialization;

namespace MPO_backend.Models;

public class ProductionOrderItem
{
    public Guid Id { get; set; }
    public string ItemCode { get; set; }
    public string SuppCatNum { get; set; }
    public string ItemName { get; set; }
    public string Instruction { get; set; }
    public string Remark { get; set; }

    public ProductionOrder ProductionOrder { get; set; }
    public Guid ProductionOrderId { get; set; }
}