namespace MPO_backend.Models;

public class SerialNumber
{
    public Guid Id { get; set; }
    public long SerialNo { get; set; }
    public Guid ProductionOrderId { get; set; }

    public QualityTest QualityTest { get; set; }
}