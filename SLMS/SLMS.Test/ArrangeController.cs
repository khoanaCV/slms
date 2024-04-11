using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.ArrangeMatchesDTO;
using SLMS.Repository.Implements.ArrangeMatchesRepository;

namespace SLMS.Test
{
    public class ArrangeController
    {
        private Mock<IArrangeMatchesRepository> _arrangeMatchesRepositoryMock;
        private ArrangeMatchesController _controller;

        [SetUp]
        public void Setup()
        {
            _arrangeMatchesRepositoryMock = new Mock<IArrangeMatchesRepository>();
            _controller = new ArrangeMatchesController(_arrangeMatchesRepositoryMock.Object);
        }

        [Test]
        public void GetAllConfigAndListTeamsInTournament_WhenFound_ReturnsOk()
        {
            // Arrange
            int tournamentId = 1;
            var tournamentDetails = new TournamentArrangeDetails();
            _arrangeMatchesRepositoryMock.Setup(x => x.GetAllConfigAndListTeamsInTournament(tournamentId))
                .Returns(tournamentDetails);

            // Act
            var result = _controller.GetAllConfigAndListTeamsInTournament(tournamentId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public void GetAllConfigAndListTeamsInTournament_WhenNotFound_ReturnsNotFound()
        {
            // Arrange
            int tournamentId = 1;
            _arrangeMatchesRepositoryMock.Setup(x => x.GetAllConfigAndListTeamsInTournament(tournamentId))
                .Returns((TournamentArrangeDetails)null);

            // Act
            var result = _controller.GetAllConfigAndListTeamsInTournament(tournamentId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public void SaveArrangeMatches_WithInvalidModel_ReturnsBadRequest()
        {
            // Arrange
            var saveMatchPairingsDto = new SaveMatchPairingsDTO(); 
            _controller.ModelState.AddModelError("Error", "Model state is invalid");

            // Act
            var result = _controller.SaveArrangeMatches(saveMatchPairingsDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public void SaveArrangeMatches_WithValidModel_ReturnsOk()
        {
            // Arrange
            var saveMatchPairingsDto = new SaveMatchPairingsDTO(); 
            // Act
            var result = _controller.SaveArrangeMatches(saveMatchPairingsDto);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }
    }
}
