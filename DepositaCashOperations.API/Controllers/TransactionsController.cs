using DepositaCashOperations.Application.Common.Models;
using DepositaCashOperations.Application.Transactions.Commands.Add;
using DepositaCashOperations.Application.Transactions.Commands.Delete;
using DepositaCashOperations.Application.Transactions.Commands.Update;
using DepositaCashOperations.Application.Transactions.Queries.GetAll;
using DepositaCashOperations.Application.Transactions.Queries.GetTransactionTypes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DepositaCashOperations.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController(IMediator mediator) : ControllerBase
    {

        [HttpGet]
        [Produces(typeof(IList<TransactionDTO>))]
        public async Task<ActionResult<IList<TransactionDTO>>> GetTransactions()
        {
            var transactions = await mediator.Send(new GetAllTransactionsQuery());

            return Ok(transactions);
        }

        [HttpGet("types")]
        [Produces(typeof(IList<TransactionTypeDTO>))]
        public async Task<ActionResult<IList<TransactionTypeDTO>>> GetTransactionTypes()
        {
            var transactionTypes = await mediator.Send(new GetTransactionTypesQuery());

            return Ok(transactionTypes);
        }

        [HttpPost("Add")]
        [Produces(typeof(TransactionDTO))]
        public async Task<ActionResult<TransactionDTO>> AddTransaction(AddTransactionCommand command)
        {
            var transaction = await mediator.Send(command);

            return Ok(transaction);
        }

        [HttpPut("Update")]
        [Produces(typeof(TransactionDTO))]
        public async Task<ActionResult<TransactionDTO>> UpdateTransaction(UpdateTransactionCommand command)
        {
            var transaction = await mediator.Send(command);

            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionDTO>> DeleteManyTransaction(int id)
        {
            await mediator.Send(new DeleteTransactionCommand { Id = id });

            return Ok();
        }
    }
}
