using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MPO_backend.Data;
using MPO_backend.DTOs;
using MPO_backend.Models;

namespace MPO_backend.Controllers;

[ApiController]
[Route("api/productionorders")]
public class ProductionOrderController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ProductionOrderController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    //[Authorize]
    public async Task<ActionResult<List<ProductionOrderListDto>>> GetAllProductionOrders()
    {
        var query = _context.ProductionOrders.OrderByDescending(o => o.StartDate)
            .AsQueryable();
        var result = await query.ToListAsync();
        
        // mapping
        var mappedResult = new List<ProductionOrderListDto>();
        foreach (var item in result)
        {
            mappedResult.Add(new ProductionOrderListDto()
            {
                Id = item.Id,
                DocNum = item.DocNum,
                ItemName = item.ProdItemName,
                ItemCode = item.ProdItemCode,
                Quantity = item.Quantity,
                CardCode = item.CardCode,
                CardName = item.CardName,
                ProductionText = item.ProductionText,
                StartDate = item.StartDate
            });
        }

        return mappedResult;
    }

    [HttpGet("{id:guid}")]
    //[Authorize]
    public async Task<ActionResult<ProductionOrderDto>> GetProductionOrderById(Guid id)
    {
        var productionOrder = await _context.ProductionOrders
            .Include(x => x.ProductionOrderItems)
            .Include(x => x.QualityTests)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (productionOrder == null) return NotFound();

        var mappedResult = new ProductionOrderDto()
        {
            Id = productionOrder.Id,
            DocNum = productionOrder.DocNum,
            ItemName = productionOrder.ProdItemName,
            ItemCode = productionOrder.ProdItemCode,
            Quantity = productionOrder.Quantity,
            CardCode = productionOrder.CardCode,
            CardName = productionOrder.CardName,
            Instruction = productionOrder.Instruction,
            InstructionFile = productionOrder.InstructionFile,
            WhsName = productionOrder.WhsName,
            ProductionText = productionOrder.ProductionText,
            Comment = productionOrder.Comment,
            TestInstruction = productionOrder.ProdTestInstruction,
            Photo = productionOrder.Photo,
            Logo = productionOrder.Logo,
            StartDate = productionOrder.StartDate,
            IWeight1 = productionOrder.IWeight1 ?? 0,
            IWght1Unit = productionOrder.IWght1Unit ?? 0,
            SWeight1 = productionOrder.SWeight1 ?? 0,
            SWdth1Unit = productionOrder.SWdth1Unit ?? 0,
            SLength1 = productionOrder.SLength1 ?? 0,
            SLen1Unit = productionOrder.SLen1Unit ?? 0,
            SWidth1 = productionOrder.SWidth1 ?? 0,
            SWght1Unit = productionOrder.SWght1Unit ?? 0,
            SHeight1 = productionOrder.SHeight1 ?? 0,
            SHght1Unit = productionOrder.SHght1Unit ?? 0,
            
            QualityTests = _mapper.Map<List<QualityTestDto>>(productionOrder.QualityTests),
            ProductionOrderItems = _mapper.Map<List<ProductionOrderItemDto>>(productionOrder.ProductionOrderItems)
        };
        
        return mappedResult;
    }
    
    [HttpPost]
    public async Task<ActionResult> PostProductionOrder(List<CreateProductionOrderDto> productionOrderDtos)
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
                    };

                    _context.ProductionOrders.Add(productionOrder);
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

                _context.ProductionOrderItems.AddRange(items);
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

    [HttpPost("{id:guid}")]
    public async Task<IActionResult> PostMeasures(Guid id, PostMeasureDto dto)
    {
        var productionOrder = await _context.ProductionOrders.FindAsync(id);
        if (productionOrder == null)
        {
            return NotFound();
        }
        
        productionOrder.IWeight1 = dto.IWeight1;
        productionOrder.IWght1Unit = dto.IWght1Unit;
        productionOrder.SWeight1 = dto.SWeight1;
        productionOrder.SWght1Unit = dto.SWght1Unit;
        productionOrder.SLength1 = dto.SLength1;
        productionOrder.SLen1Unit = dto.SLen1Unit;
        productionOrder.SWidth1 = dto.SWidth1;
        productionOrder.SWdth1Unit = dto.SWdth1Unit;
        productionOrder.SHeight1 = dto.SHeight1;
        productionOrder.SHght1Unit = dto.SHght1Unit;
        await _context.SaveChangesAsync();
        return Ok();
    }
}