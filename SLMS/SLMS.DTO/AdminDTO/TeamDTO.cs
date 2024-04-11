using System;
using System.Collections.Generic;

namespace SLMS.DTO.AdminDTO

{
    public partial class TeamDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Logo { get; set; }
        public string? Level { get; set; }
        public string? Phone { get; set; }
        public string? OpenOrNot { get; set; }
        public string? AgeJoin { get; set; }
        public string? ContactPerson { get; set; }
        public string? ContactPersonEmail { get; set; }
        public string? ActivityArea { get; set; }
        public string? OperatingTime { get; set; }
        public string? UniForm1 { get; set; }
        public string? UniForm2 { get; set; }
        public string? UniForm3 { get; set; }
        public string? CurrentStatus { get; set; }
        public string? Country { get; set; }
        public int? TeamManagerId { get; set; }
    }
}
