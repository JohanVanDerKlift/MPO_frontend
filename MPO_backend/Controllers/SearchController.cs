﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MPO_backend.Data;
using MPO_backend.DTOs;
using MPO_backend.RequestHelpers;
using PagedList;

namespace MPO_backend.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public SearchController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductionOrderDto>>> SearchProductionorders([FromQuery] SearchParams searchParams)
    {
        var searchResult = _context.ProductionOrders
            .Include(x => x.ProductionOrderItems)
            .Include(x => x.SerialNumbers)
            .OrderByDescending(x => x.StartDate)
            .AsQueryable();;

        //var skipNumber = (searchParams.PageNumber - 1) * searchParams.PageSize;
        var result = await searchResult.ToListAsync();
        var pagedResult = result.ToPagedList(searchParams.PageNumber, searchParams.PageSize);
        
        var mappedResult = new List<ProductionOrderDto>();
        foreach (var item in pagedResult)
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

        return Ok(new
        {
            results = mappedResult,
            pageCount = pagedResult.PageCount,
            totalCount = pagedResult.TotalItemCount,
        });
    }
}