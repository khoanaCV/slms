using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.NotificatioDTO;
using SLMS.Repository.Implements.NotificationsRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationsController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllNotifications(int userId)
        {
            var notifications = await _notificationRepository.GetAllNotificationsByUserAsync(userId);
            if (notifications.Any())
            {
                return Ok(notifications);
            }
            return NotFound("Bạn không có thông báo nào");
        }

        [HttpGet("detail/{userId}/{notifiId}")]
        public async Task<IActionResult> GetNotificationDetailForUser(int notifiId, int userId)
        {
            var notificationDetail = await _notificationRepository.GetNotificationDetailAsync(notifiId, userId);
            if (notificationDetail == null)
            {
                return NotFound();
            }
            return Ok(notificationDetail);
        }

        [HttpDelete("{userId}/delete/{notifiId}")]
        public async Task<IActionResult> DeleteNotification(int notifiId, int userId)
        {
            try
            {
                await _notificationRepository.DeleteNotificationAsync(notifiId, userId);
                return NoContent();
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{userId}/deleteAll")]
        public async Task<IActionResult> DeleteAllNotificationsForUser(int userId)
        {
            try
            {
                await _notificationRepository.DeleteAllNotificationsForUserAsync(userId);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("{userId}/markAllAsRead")]
        public async Task<IActionResult> MarkAllNotificationsAsRead(int userId)
        {
            try
            {
                await _notificationRepository.MarkAllNotificationsAsReadAsync(userId);
                return Ok(new { message = "All notifications have been marked as read." });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }
    }
}
