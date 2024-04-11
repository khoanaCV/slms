using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.LineUpDTO;
using SLMS.DTO.PlayerDTO;
using SLMS.Repository.Implements.TeamRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Test
{
    public class TeamController
    {
        private Mock<ITeamRepository> _teamRepositoryMock;
        private TeamsController _teamsController;

        [SetUp]
        public void Setup()
        {
            _teamRepositoryMock = new Mock<ITeamRepository>();
            _teamsController = new TeamsController(_teamRepositoryMock.Object);
        }

        [Test]
        public async Task GetPlayerProfile_WhenPlayerExists_ReturnsOkWithPlayerProfile()
        {
            // Arrange
            var playerId = 1;
            var expectedPlayerProfile = new PlayerProfileDTO { PlayerID = playerId, Name = "John Doe" };
            _teamRepositoryMock.Setup(x => x.GetPlayerProfileAsync(playerId)).ReturnsAsync(expectedPlayerProfile);

            // Act
            var result = await _teamsController.GetPlayerProfile(playerId);

            // Assert
            result.Result.Should().BeOfType<OkObjectResult>();
            var okResult = result.Result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedPlayerProfile);
        }

        [Test]
        public async Task CreateATeamLineUp_WithValidData_ReturnsCreatedAtActionWithLineUp()
        {
            // Arrange
            var lineUpDTO = new TeamLineUpDTO { TeamId = 1, Formation = "4-4-2" };
            _teamRepositoryMock.Setup(x => x.CreateTeamLineUpAsync(lineUpDTO)).ReturnsAsync(1); // Giả định ID trả về là 1

            // Act
            var result = await _teamsController.CreateATeamLineUp(lineUpDTO);

            // Assert
            result.Should().BeOfType<CreatedAtActionResult>();
            var createdAtResult = result as CreatedAtActionResult;
            createdAtResult.ActionName.Should().Be(nameof(_teamsController.GetATeamLineUp));
            createdAtResult.RouteValues["lineUpId"].Should().Be(1);
            createdAtResult.Value.Should().BeEquivalentTo(lineUpDTO);
        }

        [Test]
        public async Task GetAllTeamLineUps_WhenCalled_ReturnsAllTeamLineUps()
        {
            // Arrange
            var teamId = 1;
            var expectedLineUps = new List<TeamLineUpDTO>
            {
                new TeamLineUpDTO {  TeamId = teamId },
                new TeamLineUpDTO {  TeamId = teamId }
            };
            _teamRepositoryMock.Setup(x => x.GetAllTeamLineUpsAsync(teamId)).ReturnsAsync(expectedLineUps);

            // Act
            var result = await _teamsController.GetAllTeamLineUps(teamId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedLineUps);
        }

    }
}
