using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DepositaCashOperations.Application.Transactions.Commands.Delete
{
    public class DeleteTransactionCommand : IRequest<Unit>
    {
        public int Id { get; set; }

        public class DeleteTransactionCommandHandler : IRequestHandler<DeleteTransactionCommand, Unit>
        {
            private readonly IRepository<Transaction> _transactionRepository;

            public DeleteTransactionCommandHandler(IRepository<Transaction> transactionRepository)
            {
                _transactionRepository = transactionRepository;
            }

            public async Task<Unit> Handle(DeleteTransactionCommand request, CancellationToken cancellationToken)
            {
                var transaction = await _transactionRepository
                                           .GetByExpression(transaction => transaction.TransactionId == request.Id)
                                           .FirstOrDefaultAsync(cancellationToken);

                if (transaction == null) return Unit.Value;

                _transactionRepository.Remove(transaction);
                await _transactionRepository.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
