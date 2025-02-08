using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Application.Transactions.Queries.GetAll;
using MediatR;

namespace DepositaCashOperations.API.GraphQL.Queries
{
    [ExtendObjectType(OperationTypeNames.Query)]
    public class TransactionQueries
    {
        [UseOffsetPaging(IncludeTotalCount = true), UseFiltering, UseSorting]
        public async Task<IList<TransactionDTO>> GetTransactions(IMediator mediator, CancellationToken cancellationToken)
        {
            return await mediator.Send(new GetAllTransactionsQuery(), cancellationToken);
        }
    }
}
