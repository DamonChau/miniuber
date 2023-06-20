using System;
using System.Collections.Generic;

namespace MiniUberAPI.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public string? RefreshToken { get; set; }

    public string? PhoneNo { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? LoginDate { get; set; }

    public int? Status { get; set; }

    public int? UserRole { get; set; }

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    public virtual ICollection<Driver> Drivers { get; set; } = new List<Driver>();
}
