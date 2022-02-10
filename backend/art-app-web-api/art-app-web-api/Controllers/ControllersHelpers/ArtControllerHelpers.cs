using art_app_web_api.Data.DataModels;

namespace art_app_web_api.Controllers
{
    public static class ArtControllerHelpers
    {
        public static IEnumerable<ArtTreeNode> PopulateTree(List<ArtTreeNode> nodes, ArtTreeNode mainNode, int level)
        {
            ArtTreeNode root = new()
            {
                Id = mainNode.Id,
                Name = mainNode.Name,
                Type = mainNode.Type,
                Collection = new()
            };

            foreach (var node in nodes)
            {
                string fNodeId = new(node.Id.ToString().Take(level).ToArray());
                string mNodeId = new(mainNode.Id.ToString().Take(level).ToArray());

                if(fNodeId == mNodeId && node.Id.ToString().Length == level + 1)
                {
                    root.Collection.AddRange(PopulateTree(nodes, node, level + 1));
                }
            }
            
            yield return root;
        }
    }
}
