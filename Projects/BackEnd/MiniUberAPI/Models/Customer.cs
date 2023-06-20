using System;
using System.Collections.Generic;

namespace MiniUberAPI.Models;

public partial class Customer
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public string? Address { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longtidude { get; set; }

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();

    public virtual User? User { get; set; }
}
