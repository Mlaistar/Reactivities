using Domain;
using Microsoft.EntityFrameworkCore;
//using Domain;
namespace Persistence
{
    public class DataContext : DbContext
    {
        // unit of work and repository patterns.
        // cqrs and the mediator pattern.

        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }
        
    }
}