using AutoMapper;
using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DepositaCashOperations.Application.Transactions.Queries.GetTransactionTypes
{
    public class GetTransactionTypesQuery : IRequest<IList<TransactionTypeDTO>>
    {
        public class GetTransactionTypesQueryHandler : IRequestHandler<GetTransactionTypesQuery, IList<TransactionTypeDTO>>
        {
            private readonly IMapper _mapper;
            private readonly IRepository<TransactionType> _transactionTypeRepository;

            public GetTransactionTypesQueryHandler(IMapper mapper, IRepository<TransactionType> transactionTypeRepository)
            {
                _mapper = mapper;
                _transactionTypeRepository = transactionTypeRepository;
            }

            public async Task<IList<TransactionTypeDTO>> Handle(GetTransactionTypesQuery request, CancellationToken cancellationToken)
            {
                var transactionTypes = await _transactionTypeRepository.GetAll().ToListAsync(cancellationToken);

                return _mapper.Map<IList<TransactionTypeDTO>>(transactionTypes);
            }
        }
    }
}
