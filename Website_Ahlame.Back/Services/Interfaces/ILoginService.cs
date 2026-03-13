namespace Services.Interfaces;

public record LoginViewModel(string Email, string Password) : InputViewModel;

public class LoginViewModelValidator : AbstractValidator<LoginViewModel>
{
    public LoginViewModelValidator()
    {
        RuleFor(_ => _.Email)
            .NotEmpty().WithMessage("Email Required")
            .EmailAddress().WithMessage("Invalid Email");
        
        RuleFor(_ => _.Password)
            .NotEmpty().WithMessage("Password Required")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters");
    }
}

public record LoginSSOViewModel(long Nid,string Role,string Email): InputViewModel;
public class LoginSSOViewModelValidator : AbstractValidator<LoginSSOViewModel>
{
    public LoginSSOViewModelValidator()
    {
        RuleFor(_ => _.Nid).NotEmpty().WithMessage("Nid Required");
        RuleFor(_ => _.Role).NotEmpty().WithMessage("Role Required");
        RuleFor(_ => _.Email)
            .NotEmpty().WithMessage("Email Required")
            .EmailAddress().WithMessage("Invalid Email");
    }
}

public interface ILoginService
{
    Task<ResultViewModel> Login(LoginViewModel model);
    Task<ResultViewModel> LoginSSO(LoginSSOViewModel model);
}

