using art_app_web_api.Data.DataModels;
using art_app_web_api.Data.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using static art_app_web_api.Controllers.ArtControllerHelpers;

namespace art_app_web_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ArtController : ControllerBase
    {
        private readonly IArtService artService;

        public ArtController(IArtService artService)
        {
            this.artService = artService;
        }

        [HttpGet]
        [Route("collection/")]
        public async Task<ArtTreeNode[]> GetCollection(string type = "all", string? query = "")
        {
            var nodes = await artService.GetCollection(type, query);

            var mainNode = nodes.MinBy(node => node.Id);

            List<ArtTreeNode> tree = PopulateTree(nodes, mainNode, mainNode.Id.ToString().Length).ToList();

            return tree.ToArray();
        }

        [HttpGet]
        [Route("piece/")]
        public async Task<ArtPiece> GetArtPiece(int id) => 
            await artService.GetArtPieceById(id);

        [HttpPost]
        [Route("piece")]
        public async Task<ArtPiece> UpdateArtPiece([FromBody] ArtPiece artPiece) =>
            await artService.UpdateArtPiece(artPiece);
 

    }
}
