using System;
using System.Collections.Generic;

namespace SLMS.DTO.AdminDTO

{
    public class FeedbackDTO
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime? SubmittedAt { get; set; }


    }
}
