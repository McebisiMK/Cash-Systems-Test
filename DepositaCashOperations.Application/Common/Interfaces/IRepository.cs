using System.Linq.Expressions;

namespace DepositaCashOperations.Application.Common.Interfaces
{
    public interface IRepository<TEntity>
    {
        void Update(TEntity entity);
        IQueryable<TEntity> GetAll();
        void Remove(TEntity entity);
        bool Exists(Expression<Func<TEntity, bool>> expression);
        Task AddAsync(TEntity entity, CancellationToken cancellationToken);
        IQueryable<TEntity> GetByExpression(Expression<Func<TEntity, bool>> expression);

        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
