using Moq;
using SLMS.API.Controllers;
using SLMS.Repository.Implements.UserRepository;
using Microsoft.Extensions.Options;
using SLMS.DTO.JwtSettingDTO;
using Microsoft.Extensions.Configuration;
using SLMS.Repository.Implements.EmailRepository;
using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.UserDTO;
using SLMS.Core.Model;
using FluentAssertions;
using SLMS.DTO.AdminDTO;

public class UserControllerTests
{
    private Mock<IUserRepository> _userRepositoryMock;
    private Mock<IEmailSenderRepository> _emailSenderRepositoryMock;
    private Mock<IOptionsMonitor<AppSettingDTO>> _optionsMonitorMock;
    private Mock<IConfiguration> _configurationMock;
    private UserController _userController;

    [SetUp]
    public void Setup()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _emailSenderRepositoryMock = new Mock<IEmailSenderRepository>();
        _optionsMonitorMock = new Mock<IOptionsMonitor<AppSettingDTO>>();
        _configurationMock = new Mock<IConfiguration>();
        _configurationMock.Setup(c => c["Cloudinary:CloudName"]).Returns("djnz7s2ut");
        _configurationMock.Setup(c => c["Cloudinary:ApiKey"]).Returns("822737739519266");
        _configurationMock.Setup(c => c["Cloudinary:ApiSecret"]).Returns("OpSYzFsofgqjFKRDjxdeLqq_KGA");

        _userController = new UserController(_userRepositoryMock.Object, _optionsMonitorMock.Object, _emailSenderRepositoryMock.Object, _configurationMock.Object);
    }

    [Test]
    public async Task LoginAuthen_UserValid_ReturnsOkObject()
    {
        // Arrange
        var mockUser = new User { Email = "test@example.com" };
        var loginModel = new LoginModel { Email = "test@example.com", Password = "password123" };
        _userRepositoryMock.Setup(repo => repo.Login(loginModel.Email, loginModel.Password)).ReturnsAsync(mockUser);
        _userRepositoryMock.Setup(repo => repo.GenerateToken(It.IsAny<User>())).Returns("mockToken");

        // Act
        var actualResult = await _userController.LoginAuthen(loginModel) as OkObjectResult;

        // Assert
        actualResult.Should().NotBeNull();
        actualResult?.StatusCode.Should().Be(200);
        actualResult?.Value.Should().BeEquivalentTo(new APIResponse
        {
            Success = true,
            Message = "Authenticate success",
            Data = "mockToken"
        });
    }

    [Test]
    public async Task LoginAuthen_UserInvalid_ReturnsOkObjectWithFailure()
    {
        // Arrange
        var loginModel = new LoginModel { Email = "invalid@example.com", Password = "wrongPassword" };
        _userRepositoryMock.Setup(repo => repo.Login(loginModel.Email, loginModel.Password)).ReturnsAsync((User)null);

        // Act
        var actualResult = await _userController.LoginAuthen(loginModel) as OkObjectResult;

        // Assert
        actualResult.Should().NotBeNull();
        actualResult?.StatusCode.Should().Be(200);
        actualResult?.Value.Should().BeEquivalentTo(new APIResponse
        {
            Success = false,
            Message = "User not valid"
        });
    }

    [Test]
    public async Task RegisterUser_PasswordsDoNotMatch_ReturnsBadRequest()
    {
        // Arrange
        var registerModel = new RegisterModel { Email = "test@example.com", Password = "password123", RePassword = "password124" };

        // Act
        var actualResult = await _userController.RegisterUser(registerModel) as BadRequestObjectResult;

        // Assert
        actualResult.Should().NotBeNull();
        actualResult?.StatusCode.Should().Be(400);
    }

    [Test]
    public async Task RegisterUser_NewUser_ReturnsOkObject()
    {
        // Arrange
        var registerModel = new RegisterModel { Email = "newuser@example.com", Password = "password123", RePassword = "password123" };
        _userRepositoryMock.Setup(repo => repo.Register(It.IsAny<User>())).ReturnsAsync(new User());

        // Act
        var actualResult = await _userController.RegisterUser(registerModel) as OkObjectResult;

        // Assert
        actualResult.Should().NotBeNull();
        actualResult?.StatusCode.Should().Be(200);
        actualResult?.Value.Should().BeEquivalentTo(new APIResponse
        {
            Success = true,
            Message = "User registered successfully. Please check your email to activate your account."
        });
    }


    [Test]
    public async Task UpdateProfile_ProfileUpdated_ReturnsOkWithMessage()
    {
        // Arrange
        var updateProfileDTO = new UpdateProfileModel { Fullname = "Updated Name" };
        var updatedUserDTO = new User { Fullname = "Updated Name" }; // Giả sử đã cập nhật thành công
        _userRepositoryMock.Setup(repo => repo.UpdateProfileAsync(1, It.IsAny<UpdateProfileModel>()))
            .ReturnsAsync(updatedUserDTO);

        // Act
        var result = await _userController.UpdateProfile(1, updateProfileDTO) as OkObjectResult;

        // Assert
        result.Should().NotBeNull();
        result?.StatusCode.Should().Be(200);
        var apiResponse = result?.Value as APIResponse;
        apiResponse?.Success.Should().BeTrue();
        apiResponse?.Message.Should().Be("Profile updated successfully");
        apiResponse?.Data.Should().BeEquivalentTo(updatedUserDTO);
    }

    [Test]
    public async Task SendCaptchaValidEmailSendsEmailAndReturnsOk()
    {
        // Arrange
        _emailSenderRepositoryMock.Setup(repo => repo.SendEmailAsync(It.IsAny<Message>(), It.IsAny<bool>())).Returns(Task.CompletedTask);
        _emailSenderRepositoryMock.Setup(repo => repo.SaveCustomLink(It.IsAny<string>(), It.IsAny<string>())).Returns(Task.CompletedTask);

        // Act
        var result = await _userController.SendCaptcha("user@example.com") as OkObjectResult;

        // Assert
        result.Should().NotBeNull();
        result?.StatusCode.Should().Be(200);
        var apiResponse = result?.Value as APIResponse;
        apiResponse?.Success.Should().BeTrue();
        apiResponse?.Message.Should().Be("Đã gửi đường link xác nhận thành công");
    }


    [Test]
    public async Task SendCaptcha_ValidEmail_SendsEmailAndReturnsOk()
    {
        // Arrange
        _emailSenderRepositoryMock.Setup(repo => repo.SendEmailAsync(It.IsAny<Message>(), It.IsAny<bool>())).Returns(Task.CompletedTask);
        _emailSenderRepositoryMock.Setup(repo => repo.SaveCustomLink(It.IsAny<string>(), It.IsAny<string>())).Returns(Task.CompletedTask);

        // Act
        var result = await _userController.SendCaptcha("user@example.com") as OkObjectResult;

        // Assert
        result.Should().NotBeNull();
        result?.StatusCode.Should().Be(200);
        var apiResponse = result?.Value as APIResponse;
        apiResponse?.Success.Should().BeTrue();
        apiResponse?.Message.Should().Be("Đã gửi đường link xác nhận thành công");
    }

    [Test]
    public async Task ChangePassword_ValidCredentials_ReturnsOkWithSuccessMessage()
    {
        // Arrange
        var changePasswordModel = new ChangePasswordModel { CurrentPassword = "oldPass", NewPassword = "newPass" };
        _userRepositoryMock.Setup(repo => repo.ChangePassword(It.IsAny<int>(), It.IsAny<ChangePasswordModel>())).ReturnsAsync(true);

        // Act
        var result = await _userController.ChangePassword(1, changePasswordModel) as OkObjectResult;

        // Assert
        result.Should().NotBeNull();
        result?.StatusCode.Should().Be(200);
        var apiResponse = result?.Value as APIResponse;
        apiResponse?.Success.Should().BeTrue();
        apiResponse?.Message.Should().Be("Change password successfully");
    }

}