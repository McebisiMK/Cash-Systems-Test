namespace DepositaCashOperations.Domain.Entities;

public class Transaction
{
    public int TransactionId { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; } = null!;
    public string TransactionType { get; set; } = null!;
    public DateTime DateCreated { get; set; }
}
