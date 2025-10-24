using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MPO_backend.Data;
using MPO_backend.DTOs;
using MPO_backend.Models;

namespace MPO_backend.Controllers;

[ApiController]
[Route("api/qualitytests")]
public class QualityTestController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    
    public QualityTestController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<QualityTestDto>>> GetQualityTests()
    {
        var result = await _context.QualityTests.ToListAsync();
        return Ok(_mapper.Map<List<QualityTestDto>>(result));
    }

    [Authorize]
    [HttpPost("{id:guid}")]
    public async Task<ActionResult> UpsertQualityTest(Guid id, List<PostQualityTestDto> dtos)
    {
        using var transaction = _context.Database.BeginTransaction();
        try
        {
            var productionOrder = await _context.ProductionOrders.FirstOrDefaultAsync(x => x.Id == id);
            if (productionOrder == null) return BadRequest(new { error = "Er is iets fout gegaan"});

            foreach (var dto in dtos)
            {
                var qualityTest = await _context.QualityTests.FirstOrDefaultAsync(x => 
                    x.ProductionOrderId == id && x.SerialNo == dto.SerialNo);
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == dto.UserEmail);
                
                if (qualityTest != null)
                {
                    _mapper.Map(dto, qualityTest); // Map onto the existing entity
                    qualityTest.ProductionOrder = productionOrder;
                    qualityTest.UserId = user.Id;
                    if (qualityTest.CreatedAt == DateTime.MinValue)
                    {
                        qualityTest.CreatedAt = DateTime.Now;
                        qualityTest.UpdatedAt = DateTime.Now;
                    }
                    else
                    {
                        qualityTest.UpdatedAt = DateTime.Now;
                    }
                    _context.QualityTests.Update(qualityTest);
                }
                else
                {
                    qualityTest = _mapper.Map<QualityTest>(dto);
                    qualityTest.ProductionOrder = productionOrder;
                    qualityTest.UserId = user.Id;
                    qualityTest.CreatedAt = DateTime.Now;
                    qualityTest.UpdatedAt = DateTime.Now;
                    await _context.QualityTests.AddAsync(qualityTest);
                }
            }
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return BadRequest($"Er is iets fout gegaan: {ex.Message}");
        }
        
        await _context.SaveChangesAsync();
        await transaction.CommitAsync();
            
        return Ok();
    }

    [HttpPost("serials")]
    public async Task<ActionResult> SyncSerials(List<SerialNumberDto> dtos)
    {
        using var transaction = _context.Database.BeginTransaction();
        try
        {
            foreach (var dto in dtos)
            {
                var qualityTest =
                    _context.QualityTests.FirstOrDefault(x => x.SerialNo == dto.SerialNo);
                var productionOrder = _context.ProductionOrders.FirstOrDefault(x => 
                    x.DocNum == dto.ProductionNumber);

                if (qualityTest != null)
                {
                    qualityTest.SerialNo = dto.SerialNo;
                    await _context.QualityTests.AddAsync(qualityTest);
                }
                else if (productionOrder != null)
                {
                    qualityTest = new QualityTest()
                    {
                        MechanicalTest = false,
                        VisualTest = false,
                        ElectricalTest = false,
                        OperationalTest = false,
                        TestResult = false,
                        SerialNo = dto.SerialNo,
                        ProductionOrderId = productionOrder.Id,
                    };
                    await _context.QualityTests.AddAsync(qualityTest);
                }
                else
                {
                    return BadRequest($"ProductionOrder with DocNum {dto.ProductionNumber} not found");
                }
            }
            
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            
            return Ok();
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return BadRequest($"Er is iets fout gegaan: {ex.Message}");
        }
    }
}