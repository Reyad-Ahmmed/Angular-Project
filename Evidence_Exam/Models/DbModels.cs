using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile_Brand.Models
{
    public class Brand
    {
        public Brand() { this.Mobiles = new List<Mobile>(); }
        public int BrandId { get; set; }
        [Required, StringLength(40), Display(Name = "Brand Name")]
        public string BrandName { get; set; }
        [Required, StringLength(30)]
        public string Country { get; set; }
        //Navigation
        public virtual ICollection<Mobile> Mobiles { get; set; }
    }
    public class Mobile
    {
        public int MobileId { get; set; }
        [Required, StringLength(40)]
        public string Model { get; set; }
        [Required, Column(TypeName = "money")]
        public decimal Price { get; set; }
        [Required, Column(TypeName = "date"), Display(Name = "Release Date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime ReleaseDate { get; set; }
        [Required, StringLength(200)]
        public string Picture { get; set; }
        public bool Available { get; set; }
        //Foreign Key
        [Required, ForeignKey("Brand")]
        public int BrandId { get; set; }
        //Navigation
        public virtual Brand Brand { get; set; }
    }
    public class MobileDbContext : DbContext
    {
        public MobileDbContext(DbContextOptions<MobileDbContext> options) : base(options) { }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Mobile> Mobiles { get; set; }
    }
}
