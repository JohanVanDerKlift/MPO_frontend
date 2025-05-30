using Microsoft.AspNetCore.Mvc;
using MPO_backend.Data;
using MPO_backend.DTOs;
using MPO_backend.Models;

namespace MPO_backend.Controllers;

[ApiController]
[Route("api/serialnumbers")]
public class SerialNumberController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SerialNumberController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult> PostSerialNumber(CreateSerialNumberDto serialNumberDto)
    {
        var serialNumber = new SerialNumber
        {
            SerialNo = serialNumberDto.SerialNo,
            ProductionOrderId = serialNumberDto.ProductionOrderId
        };
        
        _context.SerialNumbers.Add(serialNumber);
        var result = await _context.SaveChangesAsync() > 0;
        if (!result) return BadRequest("Could not save SerialNumber to the DB");
        return Ok();
    }
}