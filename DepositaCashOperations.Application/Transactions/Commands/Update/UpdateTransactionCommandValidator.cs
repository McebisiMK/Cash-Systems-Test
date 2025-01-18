using DepositaCashOperations.Application.Common.Constants;
using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Domain.Entities;
using FluentValidation;

namespace DepositaCashOperations.Application.Transactions.Commands.Update
{
    public class UpdateTransactionCommandValidator : AbstractValidator<UpdateTransactionCommand>
    {
        private readonly IRepository<Transaction> _transactionRepository;

        public UpdateTransactionCommandValidator(IRepository<Transaction> transactionRepository)
        {
            _transactionRepository = transactionRepository;

            RuleFor(request => request.Id)
             .NotEmpty()
             .WithMessage("Id is required")
             .Must(BeAnExistingTransaction)
             .WithMessage("Given transaction is invalid");

            RuleFor(request => request.Amount)
             .NotEmpty()
             .WithMessage("Amount is required");

            RuleFor(request => request.Description)
             .NotEmpty()
             .WithMessage("Description is required");

            RuleFor(request => request.TransactionType)
             .Must(BeValidTransactionType)
             .WithMessage($"Invalid transaction type. See the list of valid transaction types: {string.Join(", ", TransactionTypeConstant.TransactionTypes)}");
        }

        private bool BeAnExistingTransaction(int transactionId)
        {
            return _transactionRepository.Exists(transaction => transaction.TransactionId == transactionId);
        }

        private bool BeValidTransactionType(string transactionType)
        {
            return TransactionTypeConstant.TransactionTypes.Contains(transactionType);
        }
    }
}
