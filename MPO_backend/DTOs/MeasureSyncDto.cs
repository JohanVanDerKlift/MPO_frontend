namespace MPO_backend.DTOs;

public class MeasureSyncDto
{
    public long DocNum { get; set; }
    public string ProdItemCode { get; set; }
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
}