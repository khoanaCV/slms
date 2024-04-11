using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using NUnit.Framework;
using SLMS.DTO.JwtSettingDTO;
using SLMS.DTO.TeamRegistrationDTO;
using SLMS.Repository.Implements.TeamRegistrationRepository;


namespace SLMS.Test
{
    public class RegistrationController
    {
        private TeamRegistrationController _controller;
        private Mock<ITeamRegistrationRepository> _mockRepository;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<ITeamRegistrationRepository>();
            _controller = new TeamRegistrationController(_mockRepository.Object);
        }

        [Test]
        public async Task GetTeamRegistrations_ReturnsListOfTeamRegistrations_WhenDataExists()
        {
            // Arrange
            var expectedTeamRegistrations = new List<TeamRegistrationModel> { /* Add some mock data */ };
            _mockRepository.Setup(repo => repo.GetTeamRegistrationsAsync()).ReturnsAsync(expectedTeamRegistrations);

            // Act
            var result = await _controller.GetTeamRegistrations();

            // Assert
            result.Result.Should().BeOfType<OkObjectResult>();
            var okResult = result.Result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedTeamRegistrations);
        }

        [Test]
        public async Task InviteTeam_ReturnsOkResult_WhenInviteSuccessful()
        {
            // Arrange
            var invitedTeam = new InvitedTeamLeagueModel { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.InviteTeam(It.IsAny<InvitedTeamLeagueModel>())).ReturnsAsync(true);

            // Act
            var result = await _controller.InviteTeam(invitedTeam);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            var apiResponse = okResult.Value as APIResponse;
            apiResponse.Should().NotBeNull();
            apiResponse.Success.Should().BeTrue();
            apiResponse.Message.Should().Be("Team invited successfully");
        }

        [Test]
        public async Task InviteTeam_ReturnsBadRequest_WhenInviteUnsuccessful()
        {
            // Arrange
            var invitedTeam = new InvitedTeamLeagueModel { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.InviteTeam(It.IsAny<InvitedTeamLeagueModel>())).ReturnsAsync(false);

            // Act
            var result = await _controller.InviteTeam(invitedTeam);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
            var badRequestResult = result as BadRequestObjectResult;
            var apiResponse = badRequestResult.Value as APIResponse;
            apiResponse.Should().NotBeNull();
            apiResponse.Success.Should().BeFalse();
            apiResponse.Message.Should().Be("Failed to invite team.");
        }

        [Test]
        public async Task GetTeamDetailInTournament_ReturnsOkResult_WhenTeamExists()
        {
            // Arrange
            var tournamentId = 1;
            var teamId = 1;
            var expectedTeamDetail = new TeamRegistrantionsDetailModel { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.GetTeamDetailInTournament(tournamentId, teamId)).ReturnsAsync(expectedTeamDetail);

            // Act
            var result = await _controller.GetTeamDetailInTournament(tournamentId, teamId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedTeamDetail);
        }

        [Test]
        public async Task GetTeamDetailInTournament_ReturnsNotFound_WhenTeamDoesNotExist()
        {
            // Arrange
            var tournamentId = 1;
            var teamId = 1;
            TeamRegistrantionsDetailModel expectedTeamDetail = null;
            _mockRepository.Setup(repo => repo.GetTeamDetailInTournament(tournamentId, teamId)).ReturnsAsync(expectedTeamDetail);

            // Act
            var result = await _controller.GetTeamDetailInTournament(tournamentId, teamId);

            // Assert
            result.Should().BeOfType<NotFoundObjectResult>();
            var notFoundResult = result as NotFoundObjectResult;
            notFoundResult.Value.Should().Be("Không tìm thấy  đội trong giải đấu này.");
        }

        [Test]
        public async Task AcceptInvitation_ReturnsOkResult_WhenAcceptedSuccessfully()
        {
            // Arrange
            var acceptModel = new AcceptInvitationModel { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.AcceptInvitation(acceptModel)).ReturnsAsync(true);

            // Act
            var result = await _controller.AcceptInvitation(acceptModel);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().Be("Invitation accepted successfully.");
        }

        [Test]
        public async Task DeclineInvitation_ReturnsOkResult_WhenDeclinedSuccessfully()
        {
            // Arrange
            var declineModel = new DeclineInvitationModel { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.DeclineInvitation(declineModel)).ReturnsAsync(true);

            // Act
            var result = await _controller.DeclineInvitation(declineModel);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().Be("Invitation reject successfully.");
        }
        [Test]
        public async Task GetTeamRegistrations_ReturnsOkResult_WhenTeamRegistrationsExist()
        {
            // Arrange
            var expectedTeamRegistrations = new List<TeamRegistrationModel> { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.GetTeamRegistrationsAsync()).ReturnsAsync(expectedTeamRegistrations);

            // Act
            var result = await _controller.GetTeamRegistrations();

            // Assert
            result.Result.Should().BeOfType<OkObjectResult>();
            var okResult = result.Result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedTeamRegistrations);
        }

        [Test]
        public async Task GetTeamRegistrations_ReturnsNotFound_WhenTeamRegistrationsDoNotExist()
        {
            // Arrange
            List<TeamRegistrationModel> expectedTeamRegistrations = null;
            _mockRepository.Setup(repo => repo.GetTeamRegistrationsAsync()).ReturnsAsync(expectedTeamRegistrations);

            // Act
            var result = await _controller.GetTeamRegistrations();

            // Assert
            result.Result.Should().BeOfType<NotFoundResult>();
        }

    
        [Test]
        public async Task GetTeamDetailInTournament_ReturnsOkResult_WhenTeamDetailExists()
        {
            // Arrange
            var tournamentId = 1;
            var teamId = 1;
            var expectedTeamDetail = new TeamRegistrantionsDetailModel { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.GetTeamDetailInTournament(tournamentId, teamId)).ReturnsAsync(expectedTeamDetail);

            // Act
            var result = await _controller.GetTeamDetailInTournament(tournamentId, teamId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedTeamDetail);
        }

        [Test]
        public async Task GetTeamDetailInTournament_ReturnsNotFound_WhenTeamDetailDoesNotExist()
        {
            // Arrange
            var tournamentId = 1;
            var teamId = 1;
            TeamRegistrantionsDetailModel expectedTeamDetail = null;
            _mockRepository.Setup(repo => repo.GetTeamDetailInTournament(tournamentId, teamId)).ReturnsAsync(expectedTeamDetail);

            // Act
            var result = await _controller.GetTeamDetailInTournament(tournamentId, teamId);

            // Assert
            result.Should().BeOfType<NotFoundObjectResult>();
        }

        [Test]
        public async Task AcceptInvitation_ReturnsOkResult_WhenAcceptSuccessful()
        {
            // Arrange
            var acceptInvitationModel = new AcceptInvitationModel { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.AcceptInvitation(acceptInvitationModel)).ReturnsAsync(true);

            // Act
            var result = await _controller.AcceptInvitation(acceptInvitationModel);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
        }

        [Test]
        public async Task DeclineInvitation_ReturnsOkResult_WhenDeclineSuccessful()
        {
            // Arrange
            var declineInvitationModel = new DeclineInvitationModel { /* Initialize with mock data */ };
            _mockRepository.Setup(repo => repo.DeclineInvitation(declineInvitationModel)).ReturnsAsync(true);

            // Act
            var result = await _controller.DeclineInvitation(declineInvitationModel);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
        }




    }
}
