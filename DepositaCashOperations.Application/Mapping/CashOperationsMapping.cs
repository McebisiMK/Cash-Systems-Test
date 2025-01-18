using AutoMapper;
using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Domain.Entities;

namespace DepositaCashOperations.Application.Mapping
{
    public class CashOperationsMapping : Profile
    {
        public CashOperationsMapping()
        {
            CreateMap<TransactionType, TransactionTypeDTO>();

            CreateMap<Transaction, TransactionDTO>()
             .ForMember(dest => dest.Id, config => config.MapFrom(src => src.TransactionId));
        }
    }
}
