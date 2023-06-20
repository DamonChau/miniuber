using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MiniUberAPI.Models;

public partial class MiniUberContext : DbContext
{
    public MiniUberContext(DbContextOptions<MiniUberContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Driver> Drivers { get; set; }

    public virtual DbSet<Trip> Trips { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address).HasMaxLength(256);
            entity.Property(e => e.Latitude).HasColumnType("decimal(8, 6)");
            entity.Property(e => e.Longtidude).HasColumnType("decimal(9, 6)");

            entity.HasOne(d => d.User).WithMany(p => p.Customers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Customers_Users");
        });

        modelBuilder.Entity<Driver>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Driver");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Image).HasMaxLength(256);
            entity.Property(e => e.Latitude).HasColumnType("decimal(8, 6)");
            entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");

            entity.HasOne(d => d.User).WithMany(p => p.Drivers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Driver_User");
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AddFrom).HasMaxLength(256);
            entity.Property(e => e.AddTo).HasMaxLength(256);

            entity.HasOne(d => d.Customer).WithMany(p => p.Trips)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK_Trips_Customers");

            entity.HasOne(d => d.Driver).WithMany(p => p.Trips)
                .HasForeignKey(d => d.DriverId)
                .HasConstraintName("FK_Trips_Drivers");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_User");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.LoginDate).HasColumnType("datetime");
            entity.Property(e => e.Password).HasMaxLength(125);
            entity.Property(e => e.PhoneNo)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.RefreshToken).HasMaxLength(125);
            entity.Property(e => e.UserName).HasMaxLength(125);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
