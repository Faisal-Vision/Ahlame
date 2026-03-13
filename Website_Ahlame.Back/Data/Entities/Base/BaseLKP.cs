namespace Entities.Abstraction;

public abstract class BaseLKP
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public long Id { get; set; }

    [MaxLength(500)]
    public required string ArabicName { get; set; }

    [MaxLength(500)]
    public required string EnglishName { get; set; }

    public bool? IsDeleted { get; set; }
    public void SoftDelete()
    {
        IsDeleted = true;
    }
}
