
using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.Core.Model;
using SLMS.DTO.SponsorDTO;
using SLMS.Repository.Implements.SponsorRepository;

namespace SLMS.Test
{
    public class SponsorsController
    {
        [Test]
        public async Task GetSponsor_ExistingSponsor_ReturnsOkObjectResult()
        {
            var mockRepository = new Mock<ISponsorRepository>();
            var controller = new SponsorController(mockRepository.Object);
            int id = 1;
            int tournamentId = 1;
            mockRepository.Setup(repo => repo.GetSponsorAsync(id, tournamentId))
                .ReturnsAsync(new SponsorModel { });

            var result = await controller.GetSponsor(id, tournamentId);
            Assert.NotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result.Result); 
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(200, okResult.StatusCode); 
        }

        [Test]
        public async Task GetAllSponsors_ReturnsOkObjectResult()
        {
            var mockRepository = new Mock<ISponsorRepository>();
            var controller = new SponsorController(mockRepository.Object);
            int tournamentId = 1;
            mockRepository.Setup(repo => repo.GetAllSponsorsAsync(tournamentId))
                .ReturnsAsync(new List<SponsorModel> {});
            var result = await controller.GetAllSponsors(tournamentId);
            Assert.NotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result.Result); 
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(200, okResult.StatusCode); 
        }

        [Test]
        public async Task UpdateSponsor_ExistingSponsor_ReturnsOkObjectResult()
        {
            var mockRepository = new Mock<ISponsorRepository>();
            var controller = new SponsorController(mockRepository.Object);
            int id = 1;
            int tournamentId = 1;
            var sponsorDTO = new SponsorDTO { };
            var updatedSponsor = new Sponsor {  };

            mockRepository.Setup(repo => repo.UpdateSponsorAsync(id, tournamentId, It.IsAny<SponsorDTO>()))
                .ReturnsAsync(updatedSponsor);

            var result = await controller.UpdateSponsor(id, tournamentId, sponsorDTO) as ActionResult<SponsorDTO>;
            Assert.NotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result.Result); 
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(200, okResult.StatusCode); 
                                                    
        }

        [Test]
        public async Task DeleteSponsor_ExistingSponsor_ReturnsNoContentResult()
        {
            var mockRepository = new Mock<ISponsorRepository>();
            var controller = new SponsorController(mockRepository.Object);
            int id = 1;
            int tournamentId = 1;
            mockRepository.Setup(repo => repo.DeleteSponsorAsync(id, tournamentId))
                .ReturnsAsync(true);

            var result = await controller.DeleteSponsor(id, tournamentId) as NoContentResult;
            Assert.NotNull(result);
        }

        [Test]
        public async Task DeleteSponsor_NonExistentSponsor_ReturnsNotFoundResult()
        {
            var mockRepository = new Mock<ISponsorRepository>();
            var controller = new SponsorController(mockRepository.Object);
            int id = 1;
            int tournamentId = 1;

            // Mock repository behavior
            mockRepository.Setup(repo => repo.DeleteSponsorAsync(id, tournamentId))
                .ReturnsAsync(false);

            var result = await controller.DeleteSponsor(id, tournamentId) as NotFoundResult;
            Assert.NotNull(result);
        }

    }
}
