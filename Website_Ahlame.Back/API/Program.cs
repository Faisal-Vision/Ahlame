using API.Exceptions.Handler;

var builder = WebApplication.CreateBuilder(args);

// ############### Configure services ################ //
builder.Services
    .AddConfig(builder.Configuration)
    .AddMyDependencyGroup();

// Add custom exception handler
builder.Services.AddExceptionHandler<CustomExceptionHandler>();


// ############### Configure middleware ################ //
var app = builder.Build();

app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Remove("X-Powered-By");
    await next();
});

app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy", "frame-ancestors 'none'");
    await next();
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseRouting();

app.UseCors("Policy"); 

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
});


app.MapControllers();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "../../temp.Front";
});

app.Run();
