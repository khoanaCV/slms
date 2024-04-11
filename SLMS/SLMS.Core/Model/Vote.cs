using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Vote
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? AwardId { get; set; }
        public int? NomineePlayerId { get; set; }
        public int? NomineeteamId { get; set; }
        public DateTime? VotedAt { get; set; }

        public virtual Award? Award { get; set; }
        public virtual Player? NomineePlayer { get; set; }
        public virtual Team? Nomineeteam { get; set; }
        public virtual User? User { get; set; }
    }
}
