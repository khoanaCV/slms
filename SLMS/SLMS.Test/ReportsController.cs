using Microsoft.AspNetCore.Mvc;
using Moq;
using SLMS.API.Controllers;
using SLMS.DTO.MacthReportsDTO;
using SLMS.Repository.Implements.MatchReportRepository;

namespace SLMS.Test
{
    public class ReportsController
    {
        private Mock<IMatchReportRepository> _matchReportRepositoryMock;
        private MatchReportsController _controller;

        [SetUp]
        public void Setup()
        {
            _matchReportRepositoryMock = new Mock<IMatchReportRepository>();
            _controller = new MatchReportsController(_matchReportRepositoryMock.Object);
        }
        [Test]
        public async Task CreatePartTwo_WithValidData_ReturnsOk()
        {
            // Arrange
            var partTwoDto = new PartTwoDTO(); // Assume PartTwoDTO is correctly populated
            _matchReportRepositoryMock.Setup(repo => repo.ProcessMatchEventsAndStatisticsAsync(partTwoDto))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.CreatePartTwo(partTwoDto);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task CreatePartTwo_WithInvalidData_ReturnsBadRequest()
        {
            // Arrange
            var partTwoDto = new PartTwoDTO(); // Assume PartTwoDTO is missing required fields
            _controller.ModelState.AddModelError("error", "some error");

            // Act
            var result = await _controller.CreatePartTwo(partTwoDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task CreatePartTwo_ProcessingFails_ReturnsBadRequest()
        {
            // Arrange
            var partTwoDto = new PartTwoDTO();
            _matchReportRepositoryMock.Setup(repo => repo.ProcessMatchEventsAndStatisticsAsync(partTwoDto))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.CreatePartTwo(partTwoDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task GetMatchReport_WithValidId_ReturnsOk()
        {
            // Arrange
            int id = 1;
            _matchReportRepositoryMock.Setup(repo => repo.GetAsync(id))
                .ReturnsAsync(new MatchReportDTO()); // Assume MatchReportDTO is your return type

            // Act
            var result = await _controller.GetMatchReport(id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetMatchReport_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            int id = 1;
            _matchReportRepositoryMock.Setup(repo => repo.GetAsync(id))
                .ReturnsAsync((MatchReportDTO)null);

            // Act
            var result = await _controller.GetMatchReport(id);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

      

        [Test]
        public async Task CreatePartOne_WithInvalidData_ReturnsBadRequest()
        {
            // Arrange
            var partOneDto = new PartOneDTO(); // Assume this is intended to be invalid
            _controller.ModelState.AddModelError("Error", "Model state is invalid"); // Simulate model validation failure

            // Act
            var result = await _controller.CreatePartOne(partOneDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.IsTrue(_controller.ModelState.ErrorCount > 0); // Ensure there's at least one validation error
        }

       
    }
}
