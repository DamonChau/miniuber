using System;
using System.Collections.Generic;

namespace MiniUberAPI.Models;

public partial class Driver
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public string? Image { get; set; }

    public int? Rate { get; set; }

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();

    public virtual User? User { get; set; }
}
