using art_app_web_api.Data;
using art_app_web_api.Data.Interface;
using art_app_web_api.Services.DataServices;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddTransient<IArtService, ArtService>();

builder.Services.AddCors(options =>
    {
        options.AddPolicy("allowCors",
            builder =>
            {
                
                builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var service = app.Services.CreateScope())
    {
        var dbContext = service.ServiceProvider.GetRequiredService<AppDbContext>();

        await dbContext.Database.EnsureCreatedAsync();
    }

}

app.UseCors("allowCors");

app.MapControllers();

app.Run();
