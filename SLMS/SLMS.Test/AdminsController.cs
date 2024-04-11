using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.AdminDTO;
using SLMS.Repository.Implements.AdminRepository;

namespace SLMS.Test
{
    public class AdminsController
    {
        private Mock<IAdminRepository> _adminRepositoryMock;
        private AdminController _controller;

        [SetUp]
        public void SetUp()
        {
            _adminRepositoryMock = new Mock<IAdminRepository>();
            _controller = new AdminController(_adminRepositoryMock.Object);
        }

        [Test]
        public async Task GetAccounts_ReturnsOkWithAccounts()
        {
            // Arrange
            var mockAccounts = new List<UserDTO> { new UserDTO(), new UserDTO() };
            _adminRepositoryMock.Setup(repo => repo.GetAccountAsync()).ReturnsAsync(mockAccounts);

            // Act
            var result = await _controller.GetAccounts();

            // Assert
            Assert.IsInstanceOf<ActionResult<IEnumerable<UserDTO>>>(result);
            var actionResult = result.Result as OkObjectResult;
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(200, actionResult.StatusCode);
            Assert.AreEqual(mockAccounts, actionResult.Value);
        }

        [Test]
        public async Task SearchAccounts_WithTerm_ReturnsOkWithFilteredAccounts()
        {
            // Arrange
            var searchTerm = "searchTerm";
            var mockAccounts = new List<UserDTO> { new UserDTO() }; // Assume these are the filtered accounts
            _adminRepositoryMock.Setup(repo => repo.SearchAccountsAsync(searchTerm)).ReturnsAsync(mockAccounts);

            // Act
            var result = await _controller.SearchAccounts(searchTerm);

            // Assert
            Assert.IsInstanceOf<ActionResult<IEnumerable<UserDTO>>>(result);
            var actionResult = result.Result as OkObjectResult;
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(mockAccounts, actionResult.Value);
        }

        [Test]
        public async Task ViewProfile_WithValidId_ReturnsOkWithProfile()
        {
            // Arrange
            int idAccount = 1;
            var mockProfile = new List<UserDTO> { new UserDTO() }; // Assuming profile data
            _adminRepositoryMock.Setup(repo => repo.ViewProfile(idAccount)).ReturnsAsync(mockProfile);

            // Act
            var result = await _controller.ViewProfile(idAccount);

            // Assert
            Assert.IsInstanceOf<ActionResult<IEnumerable<UserDTO>>>(result);
            var actionResult = result.Result as OkObjectResult;
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(mockProfile, actionResult.Value);
        }

        [Test]
        public async Task UpdateUserStatus_WithValidUser_ReturnsOk()
        {
            // Arrange
            int userId = 1;
            string status = "Active";
            _adminRepositoryMock.Setup(repo => repo.UpdateUserStatusAsync(userId, status)).ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateUserStatus(userId, status);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var actionResult = result as OkObjectResult;
            Assert.AreEqual($"User status updated to {status} successfully.", actionResult.Value);
        }

        [Test]
        public async Task UpdateUserStatus_WithInvalidUser_ReturnsNotFound()
        {
            // Arrange
            int userId = 99; 
            string status = "Active";
            _adminRepositoryMock.Setup(repo => repo.UpdateUserStatusAsync(userId, status)).ReturnsAsync(false);

            // Act
            var result = await _controller.UpdateUserStatus(userId, status);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

    }
}
