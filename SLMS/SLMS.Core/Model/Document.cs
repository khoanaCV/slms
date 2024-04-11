using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Document
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Name { get; set; }
        public string? Content { get; set; }
        public string? DocumentType { get; set; }
        public string? UrlStored { get; set; }
        public DateTime? UploadedAt { get; set; }
        public int? TournamentId { get; set; }

        public virtual Tournament? Tournament { get; set; }
    }
}
