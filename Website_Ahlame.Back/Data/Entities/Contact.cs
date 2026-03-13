namespace Data.Entities;

public class Contact : BaseEntity
{
    [Required]
    [MaxLength(250)]
    public required string Name { get; set; }

    [Required]
    [MaxLength(255)]
    [EmailAddress]
    public required string Email { get; set; }

    [MaxLength(20)]
    public string? Phone { get; set; }

    [MaxLength(500)]
    public string? Subject { get; set; }

    [Required]
    [MaxLength(2000)]
    public required string Message { get; set; }


}
