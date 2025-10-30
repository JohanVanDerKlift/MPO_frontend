using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MPO_backend.Data;
using MPO_backend.DTOs;
using MPO_backend.Models;

namespace MPO_backend.Controllers;

[ApiController]
[Route("api/sync")]
public class SyncController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper  _mapper;

    public SyncController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpPost("productionorders")]
    public async Task<ActionResult> PostProductionOrders([FromBody] List<CreateProductionOrderDto> productionOrderDtos)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var distinctOrders = productionOrderDtos
                .GroupBy(o => o.DocNum)
                .Select(g => g.First())
                .ToList();

            foreach (var dto in distinctOrders)
            {
                var productionOrder = await _context.ProductionOrders
                    .FirstOrDefaultAsync(o => o.DocNum == dto.DocNum);

                if (productionOrder != null)
                {
                    // Update bestaande order
                    productionOrder.ProdItemCode = dto.ProdItemCode;
                    productionOrder.ProdItemName = dto.ProdItemName;
                    productionOrder.Quantity = dto.Quantity;
                    productionOrder.CardCode = dto.CardCode;
                    productionOrder.CardName = dto.CardName;
                    productionOrder.WhsName = dto.WhsName;
                    productionOrder.Instruction = dto.Instruction;
                    productionOrder.InstructionFile = dto.InstructionFile;
                    productionOrder.StartDate = dto.StartDate;
                    productionOrder.ProductionText = dto.ProductionText;
                    productionOrder.ProdTestInstruction = dto.ProdTestInstruction;
                    productionOrder.Photo = dto.Photo == "1";
                    productionOrder.Logo = dto.Logo;
                    if (!productionOrder.HasChanged)
                    {
                        productionOrder.IWeight1 = dto.IWeight1 ?? 0;
                        productionOrder.IWght1Unit = dto.IWght1Unit ?? 0;
                        productionOrder.SWeight1 = dto.SWeight1 ?? 0;
                        productionOrder.SWght1Unit = dto.SWght1Unit ?? 0;
                        productionOrder.SLength1 = dto.SLength1 ?? 0;
                        productionOrder.SLen1Unit = dto.SLen1Unit ?? 0;
                        productionOrder.SWidth1 = dto.SWidth1 ?? 0;
                        productionOrder.SWdth1Unit = dto.SWdth1Unit ?? 0;
                        productionOrder.SHeight1 = dto.SHeight11 ?? 0;
                        productionOrder.SHght1Unit = dto.SHght1Unit ?? 0;
                    }

                    await _context.ProductionOrderItems
                        .Where(x => x.ProductionOrderId == productionOrder.Id)
                        .ExecuteDeleteAsync();
                }
                else
                {
                    // Nieuwe order toevoegen
                    productionOrder = new ProductionOrder
                    {
                        DocNum = dto.DocNum,
                        ProdItemCode = dto.ProdItemCode,
                        ProdItemName = dto.ProdItemName,
                        Quantity = dto.Quantity,
                        CardCode = dto.CardCode,
                        CardName = dto.CardName,
                        WhsName = dto.WhsName,
                        Instruction = dto.Instruction,
                        InstructionFile = dto.InstructionFile,
                        StartDate = dto.StartDate,
                        ProductionText = dto.ProductionText,
                        ProdTestInstruction = dto.ProdTestInstruction,
                        Photo = dto.Photo == "1",
                        Logo = dto.Logo,
                        IWeight1 = dto.IWeight1 ?? 0,
                        IWght1Unit = dto.IWght1Unit ?? 0,
                        SWeight1 = dto.SWeight1 ?? 0,
                        SWght1Unit = dto.SWght1Unit ?? 0,
                        SLength1 = dto.SLength1 ?? 0,
                        SLen1Unit = dto.SLen1Unit ?? 0,
                        SWidth1 = dto.SWidth1 ?? 0,
                        SWdth1Unit = dto.SWdth1Unit ?? 0,
                        SHeight1 = dto.SHeight11 ?? 0,
                        SHght1Unit = dto.SHght1Unit ?? 0,
                        HasChanged = false,
                    };

                    _context.ProductionOrders.Add(productionOrder);
                    await _context.SaveChangesAsync();
                }

                // Items toevoegen
                var items = productionOrderDtos
                    .Where(x => x.DocNum == dto.DocNum)
                    .Select(x => new ProductionOrderItem
                    {
                        ItemCode = x.ItemCode,
                        SuppCatNum = x.SuppCatNum,
                        ItemName = x.ItemName,
                        Instruction = x.Instruction,
                        Remark = x.Remark,
                        ProductionOrderId = productionOrder.Id
                    })
                    .ToList();

                await _context.ProductionOrderItems.AddRangeAsync(items);
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

    [HttpGet("measures")]
    public async Task<ActionResult<List<MeasureSyncDto>>> GetMeasures()
    {
        var measures = new List<MeasureSyncDto>();
        var productionOrders = await _context.ProductionOrders
            .Where(x => x.HasChanged).ToListAsync();
        if (productionOrders.Any())
        {
            foreach (var order in productionOrders)
            {
                measures.Add(new MeasureSyncDto
                {
                    DocNum = order.DocNum,
                    ProdItemCode = order.ProdItemCode,
                    IWeight1 = order.IWeight1?? 0,
                    IWght1Unit = order.IWght1Unit?? 0,
                    SWeight1 = order.SWeight1?? 0,
                    SWght1Unit = order.SWght1Unit?? 0,
                    SLength1 = order.SLength1?? 0,
                    SLen1Unit = order.SLen1Unit?? 0,
                    SWidth1 = order.SWidth1?? 0,
                    SWdth1Unit = order.SWdth1Unit?? 0,
                    SHeight1 = order.SHeight1?? 0,
                    SHght1Unit = order.SHght1Unit?? 0
                });
            }
        }
        return Ok(measures);
    }

    [HttpPost("measures")]
    public async Task<ActionResult> SetHasChanged(long docNum)
    {
        var productionOrder = await _context.ProductionOrders
            .Where(p => p.DocNum ==  docNum).FirstOrDefaultAsync();
        if (productionOrder != null)
        {
            productionOrder.HasChanged = false;
        }
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("QualityTests")]
    public async Task<ActionResult<List<QualityTestSyncDto>>> GetQualityTests()
    {
        var qualityTestDtos = new List<QualityTestSyncDto>();
        var qualityTests = await _context.QualityTests
            .Where(q => q.UpdatedAt > DateTime.Now.AddDays(-1)).ToListAsync();
        if (qualityTests.Any())
        {
            foreach (var test in qualityTests)
            {
                var productionOrder = await _context.ProductionOrders.FindAsync(test.ProductionOrderId);
                if (productionOrder != null)
                    qualityTestDtos.Add(new QualityTestSyncDto
                    {
                        MechanicalTest = test.MechanicalTest,
                        VisualTest = test.VisualTest,
                        ElectricalTest = test.ElectricalTest,
                        OperationalTest = test.OperationalTest,
                        TestResult = test.TestResult,
                        SerialNo = test.SerialNo,
                        CreatedAt = test.CreatedAt,
                        UpdatedAt = test.UpdatedAt,
                        DocNum = productionOrder.DocNum,
                    });
            }
            
            return Ok(qualityTestDtos);
        }
        
        return Ok(qualityTests);
    }
}