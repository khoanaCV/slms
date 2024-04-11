using SLMS.DTO.TeamRegistrationDTO;

namespace SLMS.Repository.Implements.TeamRegistrationRepository
{
    public interface ITeamRegistrationRepository
    {
        Task<IEnumerable<TeamRegistrationModel>> GetTeamRegistrationsAsync();
        Task<bool> InviteTeam(InvitedTeamLeagueModel team);
        Task<IEnumerable<TeamRegistrationInfoModel>> GetTeamRegistrationLeague(int tournamentId);
        Task<TeamRegistrantionsDetailModel> GetTeamDetailInTournament(int tournamentId, int teamId);

        Task<IEnumerable<TeamRegistrantionsPlayerInfoModel>> GetTeamMembersInfo(int teamId, int tournamentId);

        Task<bool> AcceptInvitation(AcceptInvitationModel model);
        Task<bool> DeclineInvitation(DeclineInvitationModel model);
    }
}
