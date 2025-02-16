﻿using DepositaCashOperations.Domain.Entities;
using DepositaCashOperations.Infrastructure.Persistence;

namespace DepositaCashOperations.Infrastructure.DataSeeding
{
    public class DatabaseInitializer(BankingDbContext bankingDbContext)
    {
        public void SeedDatabase()
        {
            bankingDbContext.Database.EnsureCreated();

            if (bankingDbContext.TransactionTypes.Any()) return;

            var transactionTypes = new List<TransactionType>
            {
                new() { Name = "Deposit" },
                new() { Name = "Withdrawal" },
                new() { Name = "Transfer" }
            };

            bankingDbContext.TransactionTypes.AddRange(transactionTypes);

            bankingDbContext.Transactions.Add(new Transaction
            {
                Amount = 3000,
                Description = "Test Transaction",
                TransactionType = "Deposit",
                DateCreated = DateTime.Now
            });

            bankingDbContext.SaveChanges();
        }
    }
}
