using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AdminService(
        IUnitOfWork _unitOfWork,
        IHttpContextAccessor _httpContextAccessor
        ) : BaseService<Admin>,
        IAdminService
    {

        public async Task<ResultViewModel> GetAll()
        {
            var data = await _unitOfWork.Repository<Admin>().GetAllAsQueryable().AsNoTracking().Select(e => new
            {
                e.Id,
                e.Nid,
                e.ArabicName,
                e.EnglishName,
                e.UserType,
                e.Email,
            }).ToListAsync();
            return new ResultViewModel(true, "data returned", "تم الحصول على البيانات", StatusCodes.Status200OK, data);
        }

        public async Task<ResultViewModel> GetById(long Id)
        {
            var data = await _unitOfWork.Repository<Admin>()
                .GetAllAsQueryable()
                .AsNoTracking()
                .Where(u => u.Id == Id)
                .Select(e => new
                {
                    e.Id,
                    e.Nid,
                    e.ArabicName,
                    e.EnglishName,
                    e.Email,
                    e.UserType
                }).FirstOrDefaultAsync();
            return new ResultViewModel(true, "All data is returned successfully", "تم استرجاع البيانات بنجاح", StatusCodes.Status200OK, data);
        }

        public async Task<ResultViewModel> AddAdmin(CreatedAdmin model)
        {
            var itemExist = await _unitOfWork.Repository<Admin>()
                       .GetAllAsQueryable()
                       .AnyAsync(e => e.Email == model.Email || e.Nid == model.Nid);
            if (itemExist)
                return new ResultViewModel(false, "student already exsist", "المستخدم موجود مسبقا", StatusCodes.Status500InternalServerError, null);

            Admin AddObject = new Admin
            {
                ArabicName = model.ArabicName,
                EnglishName = model.EnglishName,
                Password = EncryptionHelper.Encrypt(model.Password), // ✅ تشفير الباسورد
                CreationDate = DateTime.Now,
                Nid = model.Nid,
                Email = model.Email,
                UserType = model.UserType,
            };

            _unitOfWork.Repository<Admin>().Add(AddObject);
            await _unitOfWork.SaveChangesAsync();
            return new ResultViewModel(true, "The addition process was completed successfully", "تمت عملية الاضافة بنجاح", StatusCodes.Status200OK, null);
        }

        public async Task<ResultViewModel> UpdateAdmin(UpdatedAdmin model)
        {
            var oldObject = await _unitOfWork.Repository<Admin>()
                      .GetAllAsQueryable()
                      .FirstOrDefaultAsync(e => e.Id == model.Id);

            if (oldObject == null)
                return new ResultViewModel(false, "There is no data to edit", "لا توجد بيانات للتعديل عليها", StatusCodes.Status404NotFound, null);

            var itemExist = await _unitOfWork.Repository<Admin>()
                          .GetAllAsQueryable()
                          .AnyAsync(e => (e.Email == model.Email || e.Nid == model.Nid) && e.Id != model.Id);

            if (itemExist)
                return new ResultViewModel(false, "instructor already exsist", "المستخدم موجود مسبقا", StatusCodes.Status500InternalServerError, null);

            oldObject.Nid = model.Nid;
            oldObject.ArabicName = model.ArabicName;
            oldObject.EnglishName = model.EnglishName;
            oldObject.Email = model.Email;
            oldObject.UserType = model.UserType;
            oldObject.ModificationDate = DateTime.UtcNow;

            // ✅ تحديث الباسورد فقط إذا أُرسلت
            if (!string.IsNullOrEmpty(model.Password))
                oldObject.Password = EncryptionHelper.Encrypt(model.Password);

            await _unitOfWork.SaveChangesAsync();
            return new ResultViewModel(true, "The modification process was completed successfully", "تمت عملية التعديل بنجاح", StatusCodes.Status200OK, null);
        }

        public async Task<ResultViewModel> Delete(long id)
        {
            var deleteObject = await _unitOfWork.Repository<Admin>()
                              .GetAllAsQueryable()
                              .FirstOrDefaultAsync(_ => _.Id == id);

            if (deleteObject == null)
                return new ResultViewModel(false, "There is no data to delete", "لا توجد بيانات لحذفها", StatusCodes.Status404NotFound, null);

            deleteObject.ModificationDate = DateTime.UtcNow;
            deleteObject.IsDeleted = true;
            _unitOfWork.Repository<Admin>().Update(deleteObject);
            await _unitOfWork.SaveChangesAsync();

            return new ResultViewModel(true, "The deletion was completed successfully", "تمت عملية الحذف بنجاح", StatusCodes.Status200OK, null);
        }
    }
}