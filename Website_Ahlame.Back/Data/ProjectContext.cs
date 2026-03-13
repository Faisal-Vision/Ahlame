namespace Data;
public class ProjectContext : DbContext
{
    public ProjectContext(DbContextOptions options)
         : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.NoAction;
        }

        base.OnModelCreating(modelBuilder);
        ConfigureSoftDelete(modelBuilder);
    }

    protected void ConfigureSoftDelete(ModelBuilder modelBuilder)
    {
        // Apply global filter to all entities inheriting from BaseEntity
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
            {
                var parameter = Expression.Parameter(entityType.ClrType, "e");
                var isDeletedProperty = Expression.Property(parameter, nameof(BaseEntity.IsDeleted));
                var filter = Expression.Lambda(Expression.OrElse(
                    Expression.Equal(isDeletedProperty, Expression.Constant(false, typeof(bool?))),
                    Expression.Equal(isDeletedProperty, Expression.Constant(null, typeof(bool?)))),
                    parameter);
                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(filter);
            }
            if (typeof(BaseLKP).IsAssignableFrom(entityType.ClrType))
            {
                var parameter = Expression.Parameter(entityType.ClrType, "e");
                var isActiveProperty = Expression.Property(parameter, nameof(BaseLKP.IsDeleted));
                var filter = Expression.Lambda(Expression.OrElse(
                    Expression.Equal(isActiveProperty, Expression.Constant(false, typeof(bool?))),
                    Expression.Equal(isActiveProperty, Expression.Constant(null, typeof(bool?)))),
                    parameter);
                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(filter);
            }
        }

    }

    //Lkp
    //public DbSet<LKPCountry> LKPCountries { get; set; }

    //****************************************************
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Contact> Contacts { get; set; }


}
