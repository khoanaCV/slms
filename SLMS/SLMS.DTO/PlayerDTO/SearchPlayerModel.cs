

using SLMS.DTO.LineUpDTO;

namespace SLMS.DTO.PlayerDTO
{
    public class SearchPlayerModel
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public string TeamManagerName { get; set; }
        public List<PlayersDto> Players { get; set; }

        public SearchPlayerModel()
        {
            Players = new List<PlayersDto>();
        }
    }

    public class PlayersDto
    {
        public int PlayerId { get; set; }
        public string PlayerName { get; set; }
        public string Position { get; set; }
    }
}
