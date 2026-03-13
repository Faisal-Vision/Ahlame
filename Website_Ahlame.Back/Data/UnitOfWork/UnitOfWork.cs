using Data.Repositories;
using Microsoft.EntityFrameworkCore.Storage;

namespace Data.UnitOfWork
{
    public class UnitOfWork(ProjectContext Context) : IUnitOfWork
    {

        public Dictionary<Type, object> repositories = new Dictionary<Type, object>();
        private bool disposed = false;
        private IDbContextTransaction? _transaction;

        public IRepository<T> Repository<T>() where T : class
        {
            if (repositories.Keys.Contains(typeof(T)) == true)
                return (repositories[typeof(T)] as IRepository<T>)!;

            IRepository<T> repo = new GenericRepository<T>(Context);
            repositories.Add(typeof(T), repo);
            return repo;
        }

        public void BeginTransaction()
        {
            _transaction = Context.Database.BeginTransaction();
        }

        public void CommitTransaction()
        {
            _transaction?.Commit();
        }

        public void RollbackTransaction()
        {
            _transaction?.Rollback();
        }

        public async Task SaveChangesAsync()
        {
            try
            {
                await Context.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public void SaveChanges()
        {
            Context.SaveChanges();
        }

        public void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    Context.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
