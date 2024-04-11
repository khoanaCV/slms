using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.TeamRankingDTO;
using SLMS.Repository.Implements.TeamRankingRepository;

namespace SLMS.Test
{
    public class RankingController
    {
        private Mock<ITeamRankingRepository> _teamRankingRepositoryMock;
        private TeamRankingController _teamRankingController;

        [SetUp]
        public void Setup()
        {
            _teamRankingRepositoryMock = new Mock<ITeamRankingRepository>();
            _teamRankingController = new TeamRankingController(_teamRankingRepositoryMock.Object);
        }

        [Test]
        public async Task GetTeamRankings_ReturnsOkResult_WithTeamRankings()
        {
            // Arrange
            var tournamentId = 1;
            var expectedTeamRankings = new List<TeamRankingDTO> { /* Initialize with mock data */ };
            _teamRankingRepositoryMock.Setup(repo => repo.GetTeamRankingsAsync(tournamentId, null, null)).ReturnsAsync(expectedTeamRankings);

            // Act
            var result = await _teamRankingController.GetTeamRankings(tournamentId, null, null);

            // Assert
            result.Result.Should().BeOfType<OkObjectResult>();
            var okResult = result.Result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedTeamRankings);
        }

        [Test]
        public async Task GetTeamRankings_ReturnsOkResult_WithEmptyList_WhenNoTeamRankings()
        {
            // Arrange
            var tournamentId = 1;
            List<TeamRankingDTO> expectedTeamRankings = new List<TeamRankingDTO>();
            _teamRankingRepositoryMock.Setup(repo => repo.GetTeamRankingsAsync(tournamentId, null, null)).ReturnsAsync(expectedTeamRankings);

            // Act
            var result = await _teamRankingController.GetTeamRankings(tournamentId, null, null);

            // Assert
            result.Result.Should().BeOfType<OkObjectResult>();
            var okResult = result.Result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedTeamRankings);
        }

    }
}
