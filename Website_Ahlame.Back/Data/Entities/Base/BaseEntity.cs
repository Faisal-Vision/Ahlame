using System.ComponentModel.DataAnnotations;

namespace Entities.Abstraction
{
    /// <summary>
    /// Base Entity Structure for all system entities
    /// </summary>
    public abstract class BaseEntity
    {
        /// <summary>
        /// Record's Primary Key
        /// </summary>
        [Key]
        public long Id { get; set; }

        /// <summary>
        /// Record's Creation Date
        /// For Audit Purpose
        /// </summary>

        public DateTime? CreationDate { get; set; }

        /// <summary>
        /// Record's Last Modification Date
        /// For Audit Purpose
        /// </summary>

        public DateTime? ModificationDate { get; set; }

        /// <summary>
        /// Does this record marked as deleted or not
        /// </summary>

        public bool? IsDeleted { get; set; }
    }
}
