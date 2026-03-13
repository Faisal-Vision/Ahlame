namespace Services;

public class LoginService(IUnitOfWork _unitOfWork, JWTHelper _jWTHelper, EncryptionHelper _encryptionHelper) : BaseService<LoginService>, ILoginService
{
    public async Task<ResultViewModel> Login(LoginViewModel model)
    {
        var admin = await _unitOfWork.Repository<Admin>()
            .GetAllAsQueryable()
            .FirstOrDefaultAsync(_ => _.Email.ToLower() == model.Email.ToLower());

        if (admin == null)
            return new ResultViewModel(false, "Access denied", "غير مفوض", StatusCodes.Status401Unauthorized, null);

        // ✅ مؤقتاً للاختبار - مقارنة مباشرة
        if (admin.Password != model.Password)
            return new ResultViewModel(false, "Invalid credentials", "بيانات خاطئة", StatusCodes.Status401Unauthorized, null);

        var token = _jWTHelper.GenerateToken(admin.Id, admin.UserType);
        return new ResultViewModel(true, "login in successfully", "تم تسجيل الدخول", StatusCodes.Status200OK, new
        {
            token,
            NameAr = admin.ArabicName,
            NameEn = admin.EnglishName,
            UserType = admin.UserType,
        });
    }

    public async Task<ResultViewModel> LoginSSO(LoginSSOViewModel model)
    {

        var admin = await _unitOfWork.Repository<Admin>()
       .GetAllAsQueryable()
       .FirstOrDefaultAsync(_ => _.Nid == model.Nid && _.Email == model.Email);

        if (admin == null)
            return new ResultViewModel(false, "Access denied ", "غير مفوض لك بالدخول على النظام", StatusCodes.Status401Unauthorized, null);

        var token = _jWTHelper.GenerateToken(admin.Id, admin.UserType);
        return new ResultViewModel(true, "login in successfully", "تم تسجيل الدخول بنجاح", StatusCodes.Status200OK, new
        {
            token,
            NameAr = admin.ArabicName,
            NameEn = admin.EnglishName,
            UserType = admin.UserType,
        });


    }
}
