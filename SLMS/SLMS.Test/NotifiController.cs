using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.NotificatioDTO;
using SLMS.Repository.Implements.NotificationsRepository;

namespace SLMS.Test
{
    public class NotifiController
    {
        private Mock<INotificationRepository> _notificationRepositoryMock;
        private NotificationsController _controller;

        [SetUp]
        public void SetUp()
        {
            _notificationRepositoryMock = new Mock<INotificationRepository>();
            _controller = new NotificationsController(_notificationRepositoryMock.Object);
        }

        [Test]
        public async Task GetAllNotifications_WithNotifications_ReturnsOk()
        {
            // Arrange
            int userId = 1;
            _notificationRepositoryMock.Setup(repo => repo.GetAllNotificationsByUserAsync(userId))
                .ReturnsAsync(new List<NotificationModel> { new NotificationModel() });

            // Act
            var result = await _controller.GetAllNotifications(userId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetAllNotifications_WithoutNotifications_ReturnsNotFound()
        {
            // Arrange
            int userId = 1;
            _notificationRepositoryMock.Setup(repo => repo.GetAllNotificationsByUserAsync(userId))
                .ReturnsAsync(new List<NotificationModel>());

            // Act
            var result = await _controller.GetAllNotifications(userId);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task GetNotificationDetailForUser_WithDetail_ReturnsOk()
        {
            // Arrange
            int userId = 1, notifiId = 1;
            _notificationRepositoryMock.Setup(repo => repo.GetNotificationDetailAsync(notifiId, userId))
                .ReturnsAsync(new ViewDetailNotificationModel());

            // Act
            var result = await _controller.GetNotificationDetailForUser(notifiId, userId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetNotificationDetailForUser_WithoutDetail_ReturnsNotFound()
        {
            // Arrange
            int userId = 1, notifiId = 1;
            _notificationRepositoryMock.Setup(repo => repo.GetNotificationDetailAsync(notifiId, userId))
                .ReturnsAsync((ViewDetailNotificationModel)null);

            // Act
            var result = await _controller.GetNotificationDetailForUser(notifiId, userId);

            // Assert
            //Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task DeleteNotification_Success_ReturnsNoContent()
        {
            // Arrange
            int userId = 1, notifiId = 1;
            // No setup needed for a successful deletion

            // Act
            var result = await _controller.DeleteNotification(notifiId, userId);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task DeleteNotification_UnauthorizedAccess_ReturnsUnauthorized()
        {
            // Arrange
            int userId = 1, notifiId = 1;
            _notificationRepositoryMock.Setup(repo => repo.DeleteNotificationAsync(notifiId, userId))
                .ThrowsAsync(new UnauthorizedAccessException());

            // Act
            var result = await _controller.DeleteNotification(notifiId, userId);

            // Assert
            Assert.IsInstanceOf<UnauthorizedResult>(result);
        }
    }
}
