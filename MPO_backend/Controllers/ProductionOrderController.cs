using AutoMapper;
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
    // [Authorize]
    public async Task<ActionResult<List<ProductionOrderDto>>> GetAllProductionOrderItems()
    {
        var query = _context.ProductionOrders.OrderBy(o => o.DocNum)
            .Include(x => x.ProductionOrderItems)
            .Include(x => x.SerialNumbers)
            .AsQueryable();
        var result = await query.ToListAsync();
        
        // mapping
        var mappedResult = new List<ProductionOrderDto>();
        foreach (var item in result)
        {
            mappedResult.Add(new ProductionOrderDto()
            {
                Id = item.Id,
                DocNum = item.DocNum,
                ItemName = item.ProdItemName,
                ItemCode = item.ProdItemCode,
                Quantity = item.Quantity,
                CardCode = item.CardCode,
                CardName = item.CardName,
                Instruction = item.Instruction,
                InstructionFile = item.InstructionFile,
                WhsName = item.WhsName,
                ProductionText = item.ProductionText,
                Comment = item.Comment,
                TestInstruction = item.ProdTestInstruction,
                Photo = item.Photo,
                StartDate = item.StartDate,
                SerialNumbers = _mapper.Map<List<SerialNumberDto>>(item.SerialNumbers),
                ProductionOrderItems = _mapper.Map<List<ProductionOrderItemDto>>(item.ProductionOrderItems)
            });
        }

        return mappedResult;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductionOrderDto>> GetProductionOrderById(Guid id)
    {
        var productionOrder = await _context.ProductionOrders
            .Include(x => x.ProductionOrderItems)
            .Include(x => x.SerialNumbers)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (productionOrder == null) return NotFound();
        return _mapper.Map<ProductionOrderDto>(productionOrder);
    }

    [HttpPost]
    public async Task<ActionResult> PostProductionOrder(List<CreateProductionOrderDto> productionOrderDtos)
    {
        List<CreateProductionOrderDto> distinctProductionOrders = productionOrderDtos
            .GroupBy(o => o.DocNum)
            .Select(x => x.First())
            .ToList();

        foreach (var productionOrderDto in distinctProductionOrders)
        {
            var result = false;
            if (_context.ProductionOrders.Any(o => o.DocNum == productionOrderDto.DocNum))
            {
                // Update productionOrder
                var productionOrder = await _context.ProductionOrders.FirstOrDefaultAsync(o => o.DocNum == productionOrderDto.DocNum);
                productionOrder.DocNum = productionOrderDto.DocNum;
                productionOrder.ProdItemCode = productionOrderDto.ProdItemCode;
                productionOrder.ProdItemName = productionOrderDto.ProdItemName;
                productionOrder.Quantity = productionOrderDto.Quantity;
                productionOrder.CardCode = productionOrderDto.CardCode;
                productionOrder.CardName = productionOrderDto.CardName;
                productionOrder.WhsName = productionOrderDto.WhsName;
                productionOrder.Instruction = productionOrderDto.Instruction;
                productionOrder.InstructionFile = productionOrderDto.InstructionFile;
                productionOrder.StartDate = productionOrderDto.StartDate;
                productionOrder.ProductionText = productionOrderDto.ProductionText;
                productionOrder.ProdTestInstruction = productionOrderDto.ProdTestInstruction;
                productionOrder.Photo = productionOrderDto.Photo;
                productionOrder.Logo = productionOrderDto.Logo;
                
                result = await _context.SaveChangesAsync() > 0;
                if (!result) return BadRequest("Could not save ProductionOrder to the DB");

                await _context.ProductionOrderItems.Where(x => x.ProductionOrderId == productionOrder.Id).ExecuteDeleteAsync();
                
                var newProductionOrderItems = new List<ProductionOrderItem>();
                var relevantProductionOrders = productionOrderDtos.Where(x => x.DocNum == productionOrder.DocNum);
                foreach (var item in relevantProductionOrders)
                {
                    newProductionOrderItems.Add(new ProductionOrderItem()
                    {
                        ItemCode = item.ItemCode,
                        SuppCatNum = item.SuppCatNum,
                        ItemName = item.ItemName,
                        Instruction = item.Instruction,
                        Remark = item.Remark,
                        ProductionOrderId = productionOrder.Id,
                    });
                }
                _context.ProductionOrderItems.AddRange(newProductionOrderItems);
                result = await _context.SaveChangesAsync() > 0;
                if (!result) return BadRequest("Could not save ProductionOrderItems to the DB");
            }
            else
            {
                var productionOrder = new ProductionOrder()
                {
                    DocNum = productionOrderDto.DocNum,
                    ProdItemCode = productionOrderDto.ProdItemCode,
                    ProdItemName = productionOrderDto.ProdItemName,
                    Quantity = productionOrderDto.Quantity,
                    CardCode = productionOrderDto.CardCode,
                    
                    CardName = productionOrderDto.CardName,
                    WhsName = productionOrderDto.WhsName,
                    Instruction = productionOrderDto.Instruction,
                    InstructionFile = productionOrderDto.InstructionFile,
                    StartDate = productionOrderDto.StartDate,
                    ProductionText = productionOrderDto.ProductionText,
                    ProdTestInstruction = productionOrderDto.ProdTestInstruction,
                    Photo = productionOrderDto.Photo,
                    Logo = productionOrderDto.Logo
                };
                _context.ProductionOrders.Add(productionOrder);
                result = await _context.SaveChangesAsync() > 0;
                if (!result) return BadRequest("Could not save ProductionOrder to the DB");
            
                var productionOrderItems = new List<ProductionOrderItem>();
                List<CreateProductionOrderDto> relevantProductionOrders =
                    productionOrderDtos.Where(x => x.DocNum == productionOrderDto.DocNum).ToList();
            
                foreach (var item in relevantProductionOrders)
                {
                    productionOrderItems.Add(new ProductionOrderItem()
                    {
                        ItemCode = item.ItemCode,
                        SuppCatNum = item.SuppCatNum,
                        ItemName = item.ItemName,
                        Instruction = item.Instruction,
                        Remark = item.Remark,
                        ProductionOrderId = productionOrder.Id,
                    });
                }
                _context.ProductionOrderItems.AddRange(productionOrderItems);
                result = await _context.SaveChangesAsync() > 0;
                if (!result) return BadRequest("Could not save ProductionOrderItems to the DB");
            }
        }
        return Ok();
    }
}