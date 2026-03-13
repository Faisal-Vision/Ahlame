using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Services.Base;

public record InputViewModel();
public record ResultViewModel(bool Success = false, string Message = "", string ArabicMessage = "", int StatusCode = StatusCodes.Status500InternalServerError, object? ReturnObject = null);
public class BaseService<T>()
{
}
