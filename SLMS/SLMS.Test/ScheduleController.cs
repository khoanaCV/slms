using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.MatchInfoDTO;
using SLMS.Repository.Implements.MatchRepository;

namespace SLMS.Test
{
    public class ScheduleController
    {
        private Mock<IMatchRepository> _matchRepositoryMock;
        private MatchesController _controller;

        [SetUp]
        public void Setup()
        {
            _matchRepositoryMock = new Mock<IMatchRepository>();
            _controller = new MatchesController(_matchRepositoryMock.Object);
        }

        [Test]
        public async Task GetMatches_ReturnsOkWithMatches()
        {
            // Arrange
            int tournamentId = 1;
            _matchRepositoryMock.Setup(repo => repo.GetMatchInfosAsync(tournamentId, null, null, null, null, null))
                .ReturnsAsync(new List<MatchInfoDTO> { new MatchInfoDTO() }); // Assume MatchInfoDTO is your data transfer object

            // Act
            var result = await _controller.GetMatches(tournamentId, null, null, null, null, null);

            // Assert
            Assert.IsInstanceOf<ActionResult<IEnumerable<MatchInfoDTO>>>(result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var matches = okResult.Value as IEnumerable<MatchInfoDTO>;
            Assert.IsNotNull(matches);
            Assert.IsNotEmpty(matches);
        }

        [Test]
        public async Task GetGroupStages_WithGroupStages_ReturnsOk()
        {
            // Arrange
            int tournamentId = 1;
            _matchRepositoryMock.Setup(repo => repo.GetGroupStagesAsync(tournamentId, null))
                .ReturnsAsync(new List<GroupStageDTO> { new GroupStageDTO() }); // Assume GroupStageDTO is your data transfer object

            // Act
            var result = await _controller.GetGroupStages(tournamentId, null);

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var groupStages = okResult.Value as IEnumerable<GroupStageDTO>;
            Assert.IsNotNull(groupStages);
            Assert.IsNotEmpty(groupStages);
        }

        [Test]
        public async Task GetGroupStages_WithNoGroupStages_ReturnsNotFound()
        {
            // Arrange
            int tournamentId = 1;
            _matchRepositoryMock.Setup(repo => repo.GetGroupStagesAsync(tournamentId, null))
                .ReturnsAsync((List<GroupStageDTO>)null);

            // Act
            var result = await _controller.GetGroupStages(tournamentId, null);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

    }
}
