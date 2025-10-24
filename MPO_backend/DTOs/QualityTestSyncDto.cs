namespace MPO_backend.DTOs;

public class QualityTestSyncDto
{
    public bool MechanicalTest { get; set; }
    public bool VisualTest { get; set; }
    public bool ElectricalTest { get; set; }
    public bool OperationalTest { get; set; }
    public bool TestResult { get; set; }
    public int SerialNo { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UserEmail { get; set; }
    public long DocNum { get; set; }
}