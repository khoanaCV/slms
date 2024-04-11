
using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.MacthScheduleManageDTO;
using SLMS.Repository.Implements.MatchScheduleManageRepository;

namespace SLMS.Test
{
    public class ScheduleMângeController
    {
        private Mock<IMatchScheduleManageRepository> _matchScheduleManageRepositoryMock;
        private MatchScheduleManageController _controller;

        [SetUp]
        public void SetUp()
        {
            _matchScheduleManageRepositoryMock = new Mock<IMatchScheduleManageRepository>();
            _controller = new MatchScheduleManageController(_matchScheduleManageRepositoryMock.Object);
        }

        [Test]
        public async Task GetScheduleForTournament_WithValidSchedule_ReturnsOk()
        {
            // Arrange
            int tournamentId = 1;
            _matchScheduleManageRepositoryMock.Setup(repo => repo.GetScheduleForTournament(tournamentId))
                .ReturnsAsync(new List<MatchScheduleDTO> { new MatchScheduleDTO() }); // Assume MatchSchedule is your domain model

            // Act
            var result = await _controller.GetScheduleForTournament(tournamentId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetScheduleForTournament_WithNoSchedule_ReturnsNotFound()
        {
            // Arrange
            int tournamentId = 1;
            _matchScheduleManageRepositoryMock.Setup(repo => repo.GetScheduleForTournament(tournamentId))
                .ReturnsAsync(new List<MatchScheduleDTO>());

            // Act
            var result = await _controller.GetScheduleForTournament(tournamentId);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task UpdateMatchDetailsList_WithInvalidModelState_ReturnsBadRequest()
        {
            // Arrange
            _controller.ModelState.AddModelError("error", "some error");
            var updateDto = new UpdateMatchDetailsListDTO(); // Populate as needed for the test

            // Act
            var result = await _controller.UpdateMatchDetailsList(1, updateDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task UpdateMatchDetailsList_WithSuccessfulUpdate_ReturnsOk()
        {
            // Arrange
            int tournamentId = 1;
            var updateDto = new UpdateMatchDetailsListDTO();
            _matchScheduleManageRepositoryMock.Setup(repo => repo.UpdateMatchDetailsList(updateDto))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateMatchDetailsList(tournamentId, updateDto);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task UpdateMatchDetailsList_WithFailedUpdate_ReturnsBadRequest()
        {
            // Arrange
            int tournamentId = 1;
            var updateDto = new UpdateMatchDetailsListDTO();
            _matchScheduleManageRepositoryMock.Setup(repo => repo.UpdateMatchDetailsList(updateDto))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.UpdateMatchDetailsList(tournamentId, updateDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }
    }

   
}
