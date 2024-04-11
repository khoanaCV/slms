
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.Core.Model;
using SLMS.DTO.PrizesDTO;
using SLMS.Repository.Implements.PrizesRepository;
using SLMS.Repository.Implements.SponsorRepository;

namespace SLMS.Test
{
    public class PrizzeController
    {

        private Mock<IPrizesRepository> _prizesRepositoryMock;
        private PrizesController _prizesController;

        [SetUp]
        public void Setup()
        {
            _prizesRepositoryMock = new Mock<IPrizesRepository>();
            _prizesController = new PrizesController(_prizesRepositoryMock.Object);
        }

        [Test]
        public async Task GetPlayerMostGoals_ValidTournamentId_ReturnsOkObjectResult()
        {
            // Arrange
            int tournamentId = 1;
            var players = new List<Player>(); // Setup mock player list
            _prizesRepositoryMock.Setup(repo => repo.GetPlayerWithMostGoalsAsync(tournamentId))
                .ReturnsAsync(new PlayerPrizesDTO());

            // Act
            var result = await _prizesController.GetPlayerMostGoals(tournamentId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
        }

        [Test]
        public async Task GetPlayerMostAssists_ValidTournamentId_ReturnsOkObjectResult()
        {
            // Arrange
            int tournamentId = 1;
            var players = new List<Player>(); // Setup mock player list
            _prizesRepositoryMock.Setup(repo => repo.GetPlayerWithMostAssistsAsync(tournamentId))
                .ReturnsAsync(new PlayerPrizesDTO());

            // Act
            var result = await _prizesController.GetPlayerMostAssists(tournamentId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
        }

        [Test]
        public async Task GetPlayerMostSaves_ValidTournamentId_ReturnsOkObjectResult()
        {
            // Arrange
            int tournamentId = 1;
            var players = new List<Player>
            {
                new Player { Id = 1, Name = "Player 1" },
                new Player { Id = 2, Name = "Player 2" },
                new Player { Id = 3, Name = "Player 3" }
            };
            _prizesRepositoryMock.Setup(repo => repo.GetPlayerWithMostSavesAsync(tournamentId))
                .ReturnsAsync(new PlayerPrizesDTO()); ;
               

            // Act
            var result = await _prizesController.GetPlayerMostSaves(tournamentId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
        }

        [Test]
        public async Task GetTeamFewestTotalCards_ValidTournamentId_ReturnsOkObjectResult()
        {
            // Arrange
            int tournamentId = 1;
            var team = new Team(); // Setup mock team
            _prizesRepositoryMock.Setup(repo => repo.GetTeamFewestTotalCardsAsync(tournamentId)).ReturnsAsync(new TeamPrizesDTO()); 

            // Act
            var result = await _prizesController.GetTeamFewestTotalCards(tournamentId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
        }

    }
}
