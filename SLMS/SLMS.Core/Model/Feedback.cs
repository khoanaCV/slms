﻿using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Feedback
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime? SubmittedAt { get; set; }

        public virtual User? User { get; set; }
    }
}
