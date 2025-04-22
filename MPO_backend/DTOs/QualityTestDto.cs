﻿namespace MPO_backend.DTOs;

public class QualityTestDto
{
    public bool MechanicalTest { get; set; }
    public bool VisualTest { get; set; }
    public bool ElectricalTest { get; set; }
    public bool OperationalTest { get; set; }
    public bool TestResult { get; set; }
}