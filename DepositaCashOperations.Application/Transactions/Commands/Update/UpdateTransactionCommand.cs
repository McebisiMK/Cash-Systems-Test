using AutoMapper;
using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DepositaCashOperations.Application.Transactions.Commands.Update
{
    public class UpdateTransactionCommand : IRequest<TransactionDTO>
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string TransactionType { get; set; }

        public class UpdateTransactionCommandHandler : IRequestHandler<UpdateTransactionCommand, TransactionDTO>
        {
            private readonly IMapper _mapper;
            private readonly IRepository<Transaction> _transactionRepository;

            public UpdateTransactionCommandHandler(IMapper mapper, IRepository<Transaction> transactionRepository)
            {
                _mapper = mapper;
                _transactionRepository = transactionRepository;
            }

            public async Task<TransactionDTO> Handle(UpdateTransactionCommand request, CancellationToken cancellationToken)
            {
                var transaction = await _transactionRepository
                                          .GetByExpression(transaction => transaction.TransactionId == request.Id)
                                          .SingleAsync(cancellationToken);

                transaction.Amount = request.Amount;
                transaction.Description = request.Description;
                transaction.TransactionType = request.TransactionType;

                await _transactionRepository.SaveChangesAsync(cancellationToken);

                return _mapper.Map<TransactionDTO>(transaction);
            }
        }
    }
}
