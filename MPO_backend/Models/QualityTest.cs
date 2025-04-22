namespace MPO_backend.Models;

public class QualityTest
{
    public Guid Id { get; set; }
    public bool MechanicalTest { get; set; }
    public bool VisualTest { get; set; }
    public bool ElectricalTest { get; set; }
    public bool OperationalTest { get; set; }
    public bool TestResult { get; set; }
    
    public SerialNumber SerialNumber { get; set; }
    public Guid SerialNumberId { get; set; }
}