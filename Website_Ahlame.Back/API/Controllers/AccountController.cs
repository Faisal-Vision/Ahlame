using Services.Interfaces;

namespace API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(ILoginService _loginService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        return Ok(await _loginService.Login(model));
    }

    [HttpPost]
    public async Task<IActionResult> LoginSSO(LoginSSOViewModel model)
    {
        return Ok(await _loginService.LoginSSO(model));
    }
}
