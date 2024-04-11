namespace SLMS.DTO.NotificatioDTO
{
    public class ViewDetailNotificationModel
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? NotificationType { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? IsRead { get; set; }
        public DateTime? ReadAt { get; set; }
        public string? ActionTaken { get; set; }
        public DateTime? ActionTakenAt { get; set; }
    }

    public class DataInput
    {
        public int NotifiId { get; set; }
        public int UserId { get; set; }
    }
}
