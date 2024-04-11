using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;

namespace SLMS.Repository.BaseRepository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly SEP490Context _dbcontext;
        protected readonly DbSet<T> _entities;

        public BaseRepository(SEP490Context dbcontext)
        {
            _dbcontext = dbcontext;
            _entities = dbcontext.Set<T>();
        }

        // Create new record into database
        public async Task Add(T entity)
        {
            _entities.Add(entity);
            await _dbcontext.SaveChangesAsync();
        }

        // Delete a record with parameter is an object
        public async Task Delete(T entity)
        {
            _entities.Remove(entity);
            await _dbcontext.SaveChangesAsync();
        }

        // Find record with parameter is Id
        public T? FindByID(object id)
        {
            return _entities.Find(id);
        }

        // Get all records from model T in database
        public List<T> GetAll()
        {
            return _entities.ToList();
        }

        // Modify a record and update into database
        public async Task Update(T entity)
        {
            _entities.Update(entity);
            await _dbcontext.SaveChangesAsync();
        }

    }
}
