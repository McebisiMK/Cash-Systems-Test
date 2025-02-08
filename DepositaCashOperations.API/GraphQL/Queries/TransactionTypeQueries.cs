using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Application.Transactions.Queries.GetTransactionTypes;
using MediatR;

namespace DepositaCashOperations.API.GraphQL.Queries
{
    [ExtendObjectType(OperationTypeNames.Query)]
    public class TransactionTypeQueries
    {
        [UseFiltering, UseSorting]
        public async Task<IList<TransactionTypeDTO>> GetTransactionTypes(IMediator mediator, CancellationToken cancellationToken)
        {
            return await mediator.Send(new GetTransactionTypesQuery(), cancellationToken);
        }
    }
}
