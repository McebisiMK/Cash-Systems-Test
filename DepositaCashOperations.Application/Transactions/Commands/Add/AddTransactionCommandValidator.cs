using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Domain.Entities;
using FluentValidation;

namespace DepositaCashOperations.Application.Transactions.Commands.Add
{
    public class AddTransactionCommandValidator : AbstractValidator<AddTransactionCommand>
    {
        private readonly IRepository<TransactionType> _transactionTypeRepository;
        public AddTransactionCommandValidator(IRepository<TransactionType> transactionTypeRepository)
        {
            _transactionTypeRepository = transactionTypeRepository;

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
             .WithMessage($"Invalid transaction type. See the list of valid transaction types: {string.Join(", ", _transactionTypeRepository.GetAll().ToList())}");
        }

        private bool BeValidTransactionType(string transactionType)
        {
            return _transactionTypeRepository.Exists(x => x.Name == transactionType);
        }
    }
}
