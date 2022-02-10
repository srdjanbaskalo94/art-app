using art_app_web_api.Data.DataModels;
using Microsoft.EntityFrameworkCore;

namespace art_app_web_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<ArtPiece> ArtPieces { get; set; }

        public DbSet<ArtTreeNode> ArtTreeNodes { get; set; }
    }
}
