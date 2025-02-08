using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Application.Transactions.Commands.Add;
using DepositaCashOperations.Application.Transactions.Commands.Delete;
using DepositaCashOperations.Application.Transactions.Commands.Update;
using MediatR;

namespace DepositaCashOperations.API.GraphQL.Mutations
{
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class TransactionMutations
    {
        [UseSingleOrDefault]
        public async Task<TransactionDTO> AddTransaction(IMediator mediator, AddTransactionCommand command, CancellationToken cancellationToken)
        {
            return await mediator.Send(command, cancellationToken);
        }

        [UseSingleOrDefault]
        public async Task<TransactionDTO> UpdateTransaction(IMediator mediator, UpdateTransactionCommand command, CancellationToken cancellationToken)
        {
            return await mediator.Send(command, cancellationToken);
        }

        public async Task<bool> DeleteTransaction(IMediator mediator, DeleteTransactionCommand command, CancellationToken cancellationToken)
        {
            return await mediator.Send(command, cancellationToken);
        }
    }
}
