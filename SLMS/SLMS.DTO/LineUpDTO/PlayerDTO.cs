using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LineUpDTO
{
    public class PlayerDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? CompetitionName { get; set; }
        public string? Number { get; set; }
        public string? Position { get; set; }
        public bool Active { get; set; } = false; // Thêm trường active với giá trị mặc định là false
        public int X { get; set; } = 10; // Thêm trường x với giá trị mặc định là 50
        public int Y { get; set; } = 90;
    }

}
