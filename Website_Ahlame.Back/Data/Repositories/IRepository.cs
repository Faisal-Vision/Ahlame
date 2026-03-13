using System.Linq.Expressions;

namespace Data.Repositories
{
    public interface IRepository<T> where T : class
    {
         IEnumerable<T>  GetAll();
         T  Get(long id);
         void Add(T entity);
         void Update(T entity);
         void Delete(T entity);
         IEnumerable<T> Find (Expression<Func<T, bool>> predicate);
         T FindBy (Expression<Func<T, bool>> predicate);
         bool SaveChanges();
         IEnumerable<T> GetAll (Expression<Func<T, bool>> predicate);
         IQueryable<T> GetAllAsQueryable();

    }
}
