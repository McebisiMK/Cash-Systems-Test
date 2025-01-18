using DepositaCashOperations.Application.Common.Interfaces;
using DepositaCashOperations.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DepositaCashOperations.Infrastructure.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly DbSet<TEntity> _dbSet;
        private readonly BankingDbContext _bankingDbContext;

        public Repository(BankingDbContext bankingDbContext)
        {
            _bankingDbContext = bankingDbContext;
            _dbSet = _bankingDbContext.Set<TEntity>();
        }

        public async Task AddAsync(TEntity entity, CancellationToken cancellationToken)
        {
            await _dbSet.AddAsync(entity, cancellationToken: cancellationToken);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbSet;
        }

        public IQueryable<TEntity> GetByExpression(Expression<Func<TEntity, bool>> expression)
        {
            return _dbSet.Where(expression);
        }

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public bool Exists(Expression<Func<TEntity, bool>> expression)
        {
            return _dbSet.Any(expression);
        }

        public void Remove(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _bankingDbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
