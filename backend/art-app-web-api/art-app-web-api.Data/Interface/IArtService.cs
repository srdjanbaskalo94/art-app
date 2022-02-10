using art_app_web_api.Data.DataModels;

namespace art_app_web_api.Data.Interface
{
    public interface IArtService
    {
        Task<List<ArtTreeNode>> GetCollection(string type, string query);

        Task<ArtPiece> GetArtPieceById(int id);

        Task<ArtPiece> UpdateArtPiece(ArtPiece piece);

    }
}
