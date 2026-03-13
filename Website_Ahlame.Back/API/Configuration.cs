using API.Behavior;
using Data.Entities;
using Data.Repositories;
using Microsoft.IdentityModel.JsonWebTokens;
using Shared.Helpers;

namespace API;

public static class Configuration
{
    public static IServiceCollection AddConfig(
         this IServiceCollection services, IConfiguration config)
    {
        services.Configure<CookiePolicyOptions>(options =>
        {
            // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            options.CheckConsentNeeded = context => true;
            options.MinimumSameSitePolicy = SameSiteMode.None;
        });

        //CORS config
        services.AddCors(o => o.AddPolicy("Policy", builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        }));


        services.AddSwaggerGen(c =>
        {
            // Define the JWT Bearer Authentication scheme
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n" +
                              "Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\n" +
                              "Example: 'Bearer 12345abcdef'",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http, // Updated to Http for Bearer tokens
                Scheme = "Bearer"
            });

            // Add a global security requirement to the Swagger document
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
                                                {
                                                    {
                                                        new OpenApiSecurityScheme
                                                        {
                                                            Reference = new OpenApiReference
                                                            {
                                                                Type = ReferenceType.SecurityScheme,
                                                                Id = "Bearer"
                                                            }
                                                        },
                                                        Array.Empty<string>()
                                                    }
                                                });
        });


        //Database Context
        services.AddDbContext<ProjectContext>(options =>
            options.UseSqlServer(
                config.GetConnectionString("DefaultConnection")));


        // configure strongly typed settings objects
        var appSettingsSection = config.GetSection("AppSettings");
        services.Configure<AppSettings>(appSettingsSection);

        // configure jwt authentication
        var appSettings = appSettingsSection.Get<AppSettings>();

        var key = Encoding.ASCII.GetBytes(appSettings!.Secret);
        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
            x.Events = new JwtBearerEvents
            {
                OnTokenValidated = context =>
                {
                    //var userService = context.HttpContext.RequestServices.GetRequiredService<IRepository<Parent>>();
                    var jwtToken = context.SecurityToken as JsonWebToken;

                    if (jwtToken == null)
                    {
                        context.Fail("Unauthorized");
                        return Task.CompletedTask;
                    }

                    var userId = jwtToken.Claims.First(x => x.Type == "id")?.Value;

                    var AdminService = context.HttpContext.RequestServices.GetRequiredService<IRepository<Admin>>();
                    var userExsist = AdminService.GetAllAsQueryable().Any(_ => _.Id == long.Parse(userId!));
                    if (!userExsist)
                        context.Fail("Unauthorized");

                    return Task.CompletedTask;
                }
            };
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });


        services.AddControllers().AddJsonOptions(x =>
              x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


        services.AddMvc();
        services.AddControllers();

        // Add HttpContextAccessor for accessing HttpContext in services
        services.AddHttpContextAccessor();

        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromMinutes(30);
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
        });

        services.AddResponseCompression(options =>
        {
            options.EnableForHttps = true; // Enable compression for HTTPS requests
            options.Providers.Add<GzipCompressionProvider>(); // Use Gzip compression

        });

        services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "wwwroot";
        });


        var assembly = typeof(Program).Assembly;
        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssemblies(assembly);
            config.AddOpenBehavior(typeof(ValidationBehavior<,>));
            //config.AddOpenBehavior(typeof(LoggingBehavior<,>));
        });



        return services;
    }

    public static IServiceCollection AddMyDependencyGroup(
         this IServiceCollection services)
    {
        //UnitOfWOrk
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        //Lkp service
        services.AddScoped(typeof(LKPBaseService<>));
        // Other

        services.AddScoped<IRepository<Admin>, GenericRepository<Admin>>();
        services.AddScoped<IAdminService, AdminService>();

        services.AddScoped<ILoginService, LoginService>();
        services.AddScoped<IContactService, ContactService>();


        services.AddScoped(typeof(JWTHelper));
        services.AddScoped(typeof(EncryptionHelper));

        ///////// http client //////
        services.AddHttpClient();
     

        return services;
    }
}

