namespace DepositaCashOperations.Application.Common.Models
{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; } = null!;
        public string TransactionType { get; set; } = null!;
        public DateTime DateCreated { get; set; }
    }
}
