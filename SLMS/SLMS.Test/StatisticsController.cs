using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.LeagueDTO;
using SLMS.Repository.Implements.LeagueStatistics;

namespace SLMS.Test
{
    public class StatisticsController
    {
        private Mock<ILeagueStatisticsRepository> _leagueStatisticsRepositoryMock;
        private LeagueStatisticsController _controller;

        [SetUp]
        public void Setup()
        {
            _leagueStatisticsRepositoryMock = new Mock<ILeagueStatisticsRepository>();
            _controller = new LeagueStatisticsController(_leagueStatisticsRepositoryMock.Object);
        }

        [Test]
        public async Task GetLeagueStatistics_WhenCalled_ReturnsOk()
        {
            // Arrange
            int tournamentId = 1;
            var mockData = new LeagueStatisticsModel(); // Populate mock data as needed
            _leagueStatisticsRepositoryMock.Setup(x => x.GetLeagueStatisticsAsync(tournamentId))
                .ReturnsAsync(mockData);

            // Act
            var result = await _controller.GetLeagueStatistics(tournamentId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
        }

        [Test]
        public async Task GetLeagueStatistics_WhenNotFound_ReturnsNotFound()
        {
            // Arrange
            int tournamentId = 1;
            _leagueStatisticsRepositoryMock.Setup(x => x.GetLeagueStatisticsAsync(tournamentId))
                .ReturnsAsync((LeagueStatisticsModel)null);

            // Act
            var result = await _controller.GetLeagueStatistics(tournamentId);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }

        [Test]
        public async Task GetMatchWithMostCards_WhenCalled_ReturnsOk()
        {
            // Arrange
            int tournamentId = 1;
            var mockData = new MatchWithMostCardsModel(); // Populate mock data as needed
            _leagueStatisticsRepositoryMock.Setup(x => x.GetMatchWithMostCardsAsync(tournamentId))
                .ReturnsAsync(mockData);

            // Act
            var result = await _controller.GetMatchWithMostCards(tournamentId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
        }

        [Test]
        public async Task GetMatchWithMostCards_WhenNotFound_ReturnsNotFound()
        {
            // Arrange
            int tournamentId = 1;
            _leagueStatisticsRepositoryMock.Setup(x => x.GetMatchWithMostCardsAsync(tournamentId))
                .ReturnsAsync((MatchWithMostCardsModel)null);

            // Act
            var result = await _controller.GetMatchWithMostCards(tournamentId);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }
    }
}
