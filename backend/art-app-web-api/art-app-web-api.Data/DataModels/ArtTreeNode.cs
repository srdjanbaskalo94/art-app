using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace art_app_web_api.Data.DataModels
{
    public class ArtTreeNode
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }

        [NotMapped]
        public List<ArtTreeNode> Collection { get; set; }
    }
}
