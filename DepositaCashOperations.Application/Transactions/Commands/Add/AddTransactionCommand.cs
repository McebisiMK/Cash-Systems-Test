using AutoMapper;
using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Domain.Entities;
using MediatR;

namespace DepositaCashOperations.Application.Transactions.Commands.Add
{
    public class AddTransactionCommand : IRequest<TransactionDTO>
    {
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string TransactionType { get; set; }
        public DateTime DateCreated { get; set; }

        public class AddTransactionCommandHandler : IRequestHandler<AddTransactionCommand, TransactionDTO>
        {
            private readonly IMapper _mapper;
            private readonly IRepository<Transaction> _transactionRepository;

            public AddTransactionCommandHandler(IMapper mapper, IRepository<Transaction> transactionRepository)
            {
                _mapper = mapper;
                _transactionRepository = transactionRepository;
            }

            public async Task<TransactionDTO> Handle(AddTransactionCommand request, CancellationToken cancellationToken)
            {
                var transation = new Transaction
                {
                    Amount = request.Amount,
                    Description = request.Description,
                    TransactionType = request.TransactionType,
                    DateCreated = request.DateCreated
                };

                await _transactionRepository.AddAsync(transation, cancellationToken: cancellationToken);
                await _transactionRepository.SaveChangesAsync(cancellationToken: cancellationToken);

                return _mapper.Map<TransactionDTO>(transation);
            }
        }
    }
}
