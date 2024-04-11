using SLMS.DTO.ArrangeMatchesDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.ArrangeMatchesRepository
{
    public interface IArrangeMatchesRepository
    {
        TournamentArrangeDetails GetAllConfigAndListTeamsInTournament(int tournamentId);

        void SaveMatchPairings(SaveMatchPairingsDTO saveMatchPairingsDto);
    }
}
