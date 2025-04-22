namespace MPO_backend.Models;

public class SerialNumber
{
    public Guid Id { get; set; }
    public long ProductionNumber { get; set; }
    public long SerialNo { get; set; }

    public QualityTest QualityTest { get; set; }
}