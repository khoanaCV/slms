using Google.Apis.Drive.v3.Data;
using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.NotificatioDTO;
using SLMS.Repository.BaseRepository;

namespace SLMS.Repository.Implements.NotificationsRepository
{
    public class NotificationRepository : BaseRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(SEP490Context dbcontext) : base(dbcontext)
        {
        }

        public async Task<IEnumerable<NotificationModel>> GetAllNotificationsByUserAsync(int userId)
        {
            try
            {
                var result = await _dbcontext.Notifications
                    .Where(n => n.UserId == userId)
                    .Select(n => new NotificationModel
                    {
                        NitifiId = n.Id,
                        Content = n.Content,
                        CreatedAt = n.CreatedAt,
                        IsRead = n.IsRead,
                    })
                    .ToListAsync();

                if (result.Count() == 0)
                {
                    Console.WriteLine("Bạn không có thông báo nào");
                }
                return result;
            }
            catch (InvalidOperationException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ViewDetailNotificationModel> GetNotificationDetailAsync(int notifiId, int userId)
        {
            var detail = await _dbcontext.Notifications
               .Where(n => n.UserId == userId && n.Id == notifiId)
               .Select(n => new ViewDetailNotificationModel
               {
                   Id = n.Id,
                   Content = n.Content,
                   CreatedAt = n.CreatedAt.Value,
                   IsRead = n.IsRead,
                   ReadAt = n.ReadAt,
                   ActionTaken = n.ActionTaken,
                   ActionTakenAt = n.ActionTakenAt
               })
               .SingleOrDefaultAsync();

            if (detail == null)
            {
                Console.WriteLine("Not Found");
                return null;
            }

            // Cập nhật trường IsRead thành "Yes"
            detail.IsRead = "Yes";

            // Lấy đối tượng Notification từ context và cập nhật giá trị của nó
            var notificationToUpdate = await _dbcontext.Notifications.FindAsync(notifiId);
            if (notificationToUpdate != null)
            {
                notificationToUpdate.IsRead = "Yes";
                notificationToUpdate.ReadAt = DateTime.Now; // Cập nhật thời điểm đọc thông báo
            }

            // Lưu thay đổi vào cơ sở dữ liệu
            await _dbcontext.SaveChangesAsync();

            return detail;
        }

        public async Task DeleteNotificationAsync(int notifiId, int userId)
        {
            var notification = await _dbcontext.Notifications.FirstOrDefaultAsync(n => n.Id == notifiId && n.UserId == userId);
            if (notification == null)
            {
                throw new InvalidOperationException("Notification not found.");
            }

            if (notification.UserId != userId)
            {
                throw new UnauthorizedAccessException("User is not authorized to delete this notification.");
            }

            _dbcontext.Notifications.Remove(notification);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task DeleteAllNotificationsForUserAsync(int userId)
        {
            var notifications = _dbcontext.Notifications.Where(n => n.UserId == userId);

            if (!await notifications.AnyAsync())
            {
                throw new InvalidOperationException("No notifications found for the user.");
            }

            _dbcontext.Notifications.RemoveRange(notifications);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task MarkAllNotificationsAsReadAsync(int userId)
        {
            var userExists = await _dbcontext.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                throw new ArgumentException("User does not exist.");
            }
            var userNotifications = _dbcontext.Notifications.Where(n => n.UserId == userId);
            if (!await userNotifications.AnyAsync())
            {
                throw new InvalidOperationException("No notifications found for the user.");
            }

            // Cập nhật trạng thái của từng thông báo là chưa đọc
            await userNotifications.ForEachAsync(notification =>
            {
                notification.IsRead = "Yes";
                notification.ReadAt = DateTime.Now;
            });
            await _dbcontext.SaveChangesAsync();
        }

        public async Task<bool> SendNotification(NotificationModel notification)
        {
            // Implement your logic here to save notification to the database or any other action
            // For example:
            var newNotification = new Notification
            {
                UserId = notification.UserId,
                NotificationType = notification.NotificationType,
                Content = notification.Content
                // Other properties as needed
            };

            _dbcontext.Notifications.Add(newNotification);
            await _dbcontext.SaveChangesAsync();

            return true;
        }


    }
}
