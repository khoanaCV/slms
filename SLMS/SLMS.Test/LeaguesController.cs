using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.Core.Model;
using SLMS.DTO.JwtSettingDTO;
using SLMS.DTO.LeagueDTO;
using SLMS.Repository.Implements.TournamenceRepository;

namespace SLMS.Test
{
    public class LeaguesController
    {
        private Mock<ITournamentRepository> _tournamentRepositoryMock;
        private Mock<IHttpClientFactory> _httpClientFactoryMock;
        private LeagueController _controller;

        [SetUp]
        public void Setup()
        {
            _tournamentRepositoryMock = new Mock<ITournamentRepository>();
            _httpClientFactoryMock = new Mock<IHttpClientFactory>();
            _controller = new LeagueController(_tournamentRepositoryMock.Object, _httpClientFactoryMock.Object);
        }

        [Test]
        public async Task CreateLeague_WithValidData_ReturnsOk()
        {
            // Arrange
            var model = new CreateLeagueModel(); // Assume this is correctly populated
            _tournamentRepositoryMock.Setup(repo => repo.CreateLeagueAsync(model))
                .ReturnsAsync(new Tournament { Id = 1 }); // Assume Tournament is your domain model

            // Act
            var result = await _controller.CreateLeague(model);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task CreateLeague_OnException_ReturnsInternalServerError()
        {
            // Arrange
            var model = new CreateLeagueModel();
            _tournamentRepositoryMock.Setup(repo => repo.CreateLeagueAsync(model))
                .ThrowsAsync(new Exception("Some internal error"));

            // Act
            var result = await _controller.CreateLeague(model);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(500, objectResult.StatusCode);
        }

        [Test]
        public async Task GetPublicLeagues_ReturnsOk()
        {
            // Arrange
            _tournamentRepositoryMock.Setup(repo => repo.GetAllPublicLeaguesAsync())
                .ReturnsAsync(new List<TournamentModel> { new TournamentModel() }); // Assume League is your domain model

            // Act
            var result = await _controller.GetPublicLeagues();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetLeaguesByOrganizerId_WithValidOrganizer_ReturnsOk()
        {
            // Arrange
            int organizerId = 1;
            _tournamentRepositoryMock.Setup(repo => repo.GetLeaguesByOrganizerIdAsync(organizerId))
                .ReturnsAsync(new List<TournamentModel> { new TournamentModel() }); // Assume League is your domain model

            // Act
            var result = await _controller.GetLeaguesByOrganizerId(organizerId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task SearchTournaments_WithResults_ReturnsOk()
        {
            // Arrange
            string searchText = "football";
            _tournamentRepositoryMock.Setup(repo => repo.SearchTournamentsAsync(searchText))
                .ReturnsAsync(new List<LeagueSearchResultModel> { new LeagueSearchResultModel() }); // Assume Tournament is your domain model

            // Act
            var result = await _controller.SearchTournaments(searchText);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task SearchTournaments_WithNoResults_ReturnsOkWithMessage()
        {
            // Arrange
            string searchText = "unknown";
            _tournamentRepositoryMock.Setup(repo => repo.SearchTournamentsAsync(searchText))
                .ReturnsAsync(new List<LeagueSearchResultModel>());

            // Act
            var result = await _controller.SearchTournaments(searchText);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var response = okResult.Value as APIResponse; // Assume APIResponse is a model for API responses
            Assert.IsFalse(response.Success);
        }
    }
}
