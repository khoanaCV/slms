using SLMS.Core.Model;
using SLMS.DTO.NotificatioDTO;
using SLMS.Repository.BaseRepository;

namespace SLMS.Repository.Implements.NotificationsRepository
{
    public interface INotificationRepository : IBaseRepository<Notification>
    {
        Task<IEnumerable<NotificationModel>> GetAllNotificationsByUserAsync(int userId);

        Task<ViewDetailNotificationModel> GetNotificationDetailAsync(int notifiId, int UserId);

        Task DeleteNotificationAsync(int notifiId, int UserId);
        Task DeleteAllNotificationsForUserAsync(int userId);

        Task MarkAllNotificationsAsReadAsync(int userId);

        Task<bool> SendNotification(NotificationModel notification);
    }
}
