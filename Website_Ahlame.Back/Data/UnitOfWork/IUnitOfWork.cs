using Data.Repositories;

namespace Data.UnitOfWork
{
    public interface IUnitOfWork
    {
        Task SaveChangesAsync();
        void SaveChanges();
        void Dispose(bool disposing);
        IRepository<T> Repository<T>() where T : class;
        void RollbackTransaction();
        void CommitTransaction();
        void BeginTransaction();

    }
}
