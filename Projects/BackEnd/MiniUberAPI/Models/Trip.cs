using System;
using System.Collections.Generic;

namespace MiniUberAPI.Models;

public partial class Trip
{
    public Guid Id { get; set; }

    public Guid? DriverId { get; set; }

    public Guid? CustomerId { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? FinishedDate { get; set; }

    public string? AddFrom { get; set; }

    public string? AddTo { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Driver? Driver { get; set; }
}
