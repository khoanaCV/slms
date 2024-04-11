using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.AwardsDTO;
using SLMS.Repository.BaseRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.AwardsRepository
{
    public class AwardsRepository : BaseRepository<Award>, IAwardsRepository
    {
        public AwardsRepository(SEP490Context dbcontext) : base(dbcontext) { }

        public async Task<IEnumerable<AwardDTO>> GetAwardsAsync(int tournamentId)
        {
            var awards = await _dbcontext.Awards
                .Where(a => a.TournamentId == tournamentId)
                .Select(a => new AwardDTO
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description
                    // Thêm các trường khác nếu cần
                })
                .ToListAsync();

            return awards;
        }

        public async Task VoteForAwardAsync(VoteAwardDTO voteAwardDTO)
        {
            var existingVote = await _dbcontext.Votes.FirstOrDefaultAsync(v =>
                v.UserId == voteAwardDTO.UserId &&
                v.AwardId == voteAwardDTO.AwardId);

            if (existingVote != null)
            {
                // Người dùng đã bình chọn cho giải thưởng này trong giải đấu
                throw new InvalidOperationException("You have already voted for this award in the tournament.");
            }

            var vote = new Vote
            {
                UserId = voteAwardDTO.UserId,
                AwardId = voteAwardDTO.AwardId,
                NomineePlayerId = voteAwardDTO.NomineePlayerId,
                NomineeteamId = voteAwardDTO.NomineeteamId,
                VotedAt = DateTime.Now
                // Khởi tạo các trường khác
            };

            await _dbcontext.Votes.AddAsync(vote);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task<byte[]> ExportAwardsAsync(ExportAwardsDTO exportAwardsDTO)
        {
            var awardsData = await _dbcontext.Awards
                .Include(a => a.Votes)
                .Where(a => a.TournamentId == exportAwardsDTO.TournamentId)
                .ToListAsync();

            // Logic xuất danh sách giải thưởng. 
            // Đây là mã giả lập, thực tế cần triển khai xuất file dựa vào thư viện như ClosedXML cho Excel, iTextSharp cho PDF, v.v.

            var stream = new MemoryStream();
            // Gọi đến thư viện tạo file và lưu vào stream...

            return stream.ToArray();
        }
    }

}
