using AutoMapper;
using MPO_backend.DTOs;
using MPO_backend.Models;

namespace MPO_backend.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<ProductionOrder, ProductionOrderDto>()
            .IncludeMembers(x => x.ProductionOrderItems)
            .IncludeMembers(x => x.QualityTests);
        CreateMap<List<ProductionOrderItem>, ProductionOrderDto>();
        CreateMap<List<QualityTest>, ProductionOrderDto>();

        CreateMap<ProductionOrderItem, ProductionOrderItemDto>();
        CreateMap<QualityTest, QualityTestDto>();
        CreateMap<PostQualityTestDto, QualityTest>();
    }
}
