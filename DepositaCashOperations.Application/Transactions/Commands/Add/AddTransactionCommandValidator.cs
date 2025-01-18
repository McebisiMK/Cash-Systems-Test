using DepositaCashOperations.Application.Common.Constants;
using FluentValidation;

namespace DepositaCashOperations.Application.Transactions.Commands.Add
{
    public class AddTransactionCommandValidator : AbstractValidator<AddTransactionCommand>
    {
        public AddTransactionCommandValidator()
        {
            RuleFor(request => request.Amount)
             .NotEmpty()
             .WithMessage("Amount is required");

            RuleFor(request => request.Description)
             .NotEmpty()
             .WithMessage("Description is required");

            RuleFor(request => request.DateCreated)
             .NotEmpty()
             .WithMessage("DateCreated is required");

            RuleFor(request => request.TransactionType)
             .Must(BeValidTransactionType)
             .WithMessage($"Invalid transaction type. See the list of valid transaction types: {string.Join(", ", TransactionTypeConstant.TransactionTypes)}");
        }

        private bool BeValidTransactionType(string transactionType)
        {
            return TransactionTypeConstant.TransactionTypes.Contains(transactionType);
        }
    }
}
