using AutoMapper;
using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DepositaCashOperations.Application.Transactions.Queries.GetAll
{
    public class GetAllTransactionsQuery : IRequest<IList<TransactionDTO>>
    {
        public class GetAllTransactionsQueryHandler : IRequestHandler<GetAllTransactionsQuery, IList<TransactionDTO>>
        {
            private readonly IMapper _mapper;
            private readonly IRepository<Transaction> _transactionRepository;

            public GetAllTransactionsQueryHandler(IMapper mapper, IRepository<Transaction> transactionRepository)
            {
                _mapper = mapper;
                _transactionRepository = transactionRepository;
            }

            public async Task<IList<TransactionDTO>> Handle(GetAllTransactionsQuery request, CancellationToken cancellationToken)
            {
                var transactions = _transactionRepository.GetAll().AsNoTracking().ToList();

                return _mapper.Map<IList<TransactionDTO>>(transactions);
            }
        }
    }
}
