using art_app_web_api.Data;
using art_app_web_api.Data.DataModels;
using art_app_web_api.Data.Interface;
using Microsoft.EntityFrameworkCore;

namespace art_app_web_api.Services.DataServices
{
    public class ArtService : IArtService
    {
        private readonly AppDbContext dbContext;

        public ArtService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<List<ArtTreeNode>> GetCollection(string type = "all", string query = "") =>
            query == "" ?
                type == "all" ?
                    await dbContext.ArtTreeNodes.ToListAsync() :
                    await dbContext.ArtTreeNodes.Where(n => (n.Id.ToString().Length == 3 && n.Type == type) 
                        || n.Id.ToString().Length < 3).ToListAsync()
                : type == "all" ?
                    await dbContext.ArtTreeNodes.Where(n => n.Name.Contains(query)).ToListAsync() :
                    await dbContext.ArtTreeNodes.Where(n => ((n.Id.ToString().Length == 3 && n.Type == type) 
                        || n.Id.ToString().Length < 3) && n.Name.Contains(query)).ToListAsync();


        public async Task<ArtPiece> GetArtPieceById(int id) => await dbContext.ArtPieces.FirstOrDefaultAsync(a => a.Id == id);

        public async Task<ArtPiece> UpdateArtPiece(ArtPiece piece)
        {
            dbContext.ArtPieces.Update(piece);

            var treeNode = await dbContext.ArtTreeNodes.FirstOrDefaultAsync(n => n.Id == piece.Id);
            treeNode.Name = piece.Name;

            await dbContext.SaveChangesAsync();

            return await dbContext.ArtPieces.FirstOrDefaultAsync(a => a.Id == piece.Id);
        }

    }
}
