namespace SLMS.Repository.BaseRepository
{
    public interface IBaseRepository<T>
    {
        List<T> GetAll();
        Task Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
        T? FindByID(object id);
    }
}