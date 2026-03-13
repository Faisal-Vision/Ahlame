namespace Data.Entities;

public class Admin : BaseEntity
{
    public long Nid { get; set; }

    [Required]
    [MaxLength(250)]
    public required string ArabicName { get; set; }

    [MaxLength(250)]
    public string? EnglishName { get; set; }

    [Required]
    [MaxLength(255)]
    public required string Email { get; set; }

    [Required]
    [MaxLength(255)]
    public required string Password { get; set; }

    //public bool ISActive { get; set; }
    public UserType UserType { get; set; }

}
