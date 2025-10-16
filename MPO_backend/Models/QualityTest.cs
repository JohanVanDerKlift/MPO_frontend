namespace MPO_backend.Models;

public class QualityTest
{
    public Guid Id { get; set; }
    public bool MechanicalTest { get; set; }
    public bool VisualTest { get; set; }
    public bool ElectricalTest { get; set; }
    public bool OperationalTest { get; set; }
    public bool TestResult { get; set; }
    public int SerialNo { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UserId { get; set; }
    
    public ProductionOrder ProductionOrder { get; set; }
    public Guid ProductionOrderId { get; set; }
    
}