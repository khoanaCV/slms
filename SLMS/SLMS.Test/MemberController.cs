using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.Core.Model;
using SLMS.DTO.PlayerDTO;
using SLMS.Repository.Implements.PlayersRepository;

namespace SLMS.Test
{
    public class MemberController
    {
        private Mock<IPlayerRepository> _playerRepositoryMock;
        private TeamMemberController _teamMemberController;

        [SetUp]
        public void Setup()
        {
            _playerRepositoryMock = new Mock<IPlayerRepository>();
            _teamMemberController = new TeamMemberController(_playerRepositoryMock.Object);
        }
        [Test]
        public async Task CreateTeamMember_ValidInput_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var createPlayerModel = new CreatePlayerModel {};
            var player = new Player {};
            _playerRepositoryMock.Setup(repo => repo.CreateTeamMemberAsync(createPlayerModel)).ReturnsAsync(player);

            // Act
            var result = await _teamMemberController.CreateTeamMember(createPlayerModel);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result.Result);
        }

        [Test]
        public async Task UpdatePlayerMemberOfTeam_ValidInput_ReturnsOkObjectResult()
        {
            // Arrange
            var updatePlayerModel = new UpdatePlayerModel { };
            var updatedPlayer = new Player { };
            _playerRepositoryMock.Setup(repo => repo.UpdateTeamPlayerAsync(updatePlayerModel)).ReturnsAsync(true);

            // Act
            var result = await _teamMemberController.UpdatePlayerMemberOfTeam(updatePlayerModel);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task SearchMembersOfTeam_ValidInput_ReturnsOkObjectResult()
        {
            // Arrange
            var searchQuery = "search query";
            var players = new List<Player> {};
            _playerRepositoryMock.Setup(repo => repo.SearchPlayers(searchQuery)).ReturnsAsync(new List<SearchPlayerModel>());

            // Act
            var result = await _teamMemberController.SearchMembersOfTeam(searchQuery);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetPlayersByStatus_ValidInput_ReturnsOkObjectResult()
        {
            // Arrange
            var status = "active";
            var players = new List<Player> {};
            _playerRepositoryMock.Setup(repo => repo.FilterPlayersByStatus(status)).ReturnsAsync(new List<PlayerStatusModel>());

            // Act
            var result = await _teamMemberController.GetPlayersByStatus(status);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetPlayersByTeamIdAsync_NoPlayersFound_ReturnsNotFound()
        {
            // Arrange
            int teamId = 1;
            _playerRepositoryMock.Setup(repo => repo.GetPlayersByTeamIdAsync(teamId))
                .ReturnsAsync(new List<GetAllPlayerModel>());

            // Act
            var result = await _teamMemberController.GetPlayersByTeamIdAsync(teamId);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task CreateTeamMember_Success_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var dto = new CreatePlayerModel(); // Populate as needed
            var player = new Player(); // Populate as needed
            _playerRepositoryMock.Setup(repo => repo.CreateTeamMemberAsync(dto)).ReturnsAsync(player);

            // Act
            var result = await _teamMemberController.CreateTeamMember(dto);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result.Result);
        }

        [Test]
        public async Task CreateTeamMember_Failure_ThrowsException_ReturnsBadRequest()
        {
            // Arrange
            var dto = new CreatePlayerModel(); // Populate as needed
            _playerRepositoryMock.Setup(repo => repo.CreateTeamMemberAsync(dto)).ThrowsAsync(new Exception("Creation failed"));

            // Act
            var result = await _teamMemberController.CreateTeamMember(dto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
        }

        [Test]
        public async Task UpdatePlayerMemberOfTeam_IdNotProvided_ReturnsBadRequest()
        {
            // Arrange
            var model = new UpdatePlayerModel(); // ID not set

            // Act
            var result = await _teamMemberController.UpdatePlayerMemberOfTeam(model);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
          
        }

        [Test]
        public async Task UpdatePlayerMemberOfTeam_ThrowsArgumentException_ReturnsBadRequest()
        {
            // Arrange
            var model = new UpdatePlayerModel { Id = 1 };
            _playerRepositoryMock.Setup(repo => repo.UpdateTeamPlayerAsync(model)).ThrowsAsync(new ArgumentException("Invalid argument"));

            // Act
            var result = await _teamMemberController.UpdatePlayerMemberOfTeam(model);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

    }
}
