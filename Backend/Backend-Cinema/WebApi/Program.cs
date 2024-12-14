using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Seeder;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Pobranie ConnectionString z appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Konfiguracja DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// Dodanie Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Konfiguracja JWT Authentication
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"], // Z appsettings.json
            ValidAudience = builder.Configuration["Jwt:Audience"], // Z appsettings.json
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])) // Z appsettings.json
        };
        
        options.MapInboundClaims = true;

        // Mapowanie roszczeń do typów ASP.NET
        options.TokenValidationParameters.NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        options.TokenValidationParameters.RoleClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role";
    });

// Konfiguracja CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Frontend
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Dodanie kontrolerów
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthorization();

// Budowa aplikacji
var app = builder.Build();

// Automatyczne migrowanie bazy danych i seedowanie
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Automatyczne stosowanie migracji
    if (dbContext.Database.GetPendingMigrations().Any())
    {
        Console.WriteLine("Applying migrations...");
        dbContext.Database.Migrate();
    }
    else
    {
        Console.WriteLine("No pending migrations found.");
    }

    // Seedowanie danych
    AppDbContext.Seed(dbContext);
}

// Obsługa CORS
app.UseCors("AllowFrontend");

// Wymuszenie HTTPS tylko w środowisku produkcyjnym
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Middleware dla autoryzacji i uwierzytelniania
app.UseAuthentication();
app.UseAuthorization();

// Mapowanie kontrolerów
app.MapControllers();

// Uruchomienie aplikacji
app.Run();
