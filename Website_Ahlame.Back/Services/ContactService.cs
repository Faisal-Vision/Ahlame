namespace Services;

public class ContactService(IUnitOfWork _unitOfWork) : BaseService<ContactService>, IContactService
{
    public async Task<ResultViewModel> GetAll()
    {
        var data = await _unitOfWork.Repository<Contact>()
            .GetAllAsQueryable()
            .AsNoTracking()
            .Select(c => new
            {
                c.Id,
                c.Name,
                c.Email,
                c.Phone,
                c.Subject,
                c.Message,
            })
            .ToListAsync();

        return new ResultViewModel(true, "data returned", "تم الحصول على البيانات", StatusCodes.Status200OK, data);
    }

    public async Task<ResultViewModel> GetById(long Id)
    {
        var data = await _unitOfWork.Repository<Contact>()
            .GetAllAsQueryable()
            .AsNoTracking()
            .Where(c => c.Id == Id)
            .Select(c => new
            {
                c.Id,
                c.Name,
                c.Email,
                c.Phone,
                c.Subject,
                c.Message,
            })
            .FirstOrDefaultAsync();

        if (data == null)
            return new ResultViewModel(false, "There is no data", "لا توجد بيانات", StatusCodes.Status404NotFound, null);

        return new ResultViewModel(true, "All data is returned successfully", "تم استرجاع البيانات بنجاح", StatusCodes.Status200OK, data);
    }

    public async Task<ResultViewModel> AddContact(CreatedContact model)
    {
        //var itemExist = await _unitOfWork.Repository<Contact>()
        //    .GetAllAsQueryable()
        //    .AnyAsync(c => c.Email == model.Email);

        //if (itemExist)
        //    return new ResultViewModel(false, "Contact already exists", "رسالة التواصل موجودة مسبقاً", StatusCodes.Status500InternalServerError, null);

        var addObject = new Contact
        {
            Name = model.Name,
            Email = model.Email,
            Phone = model.Phone,
            Subject = model.Subject,
            Message = model.Message,
        };

        _unitOfWork.Repository<Contact>().Add(addObject);
        await _unitOfWork.SaveChangesAsync();

        return new ResultViewModel(true, "The addition process was completed successfully", "تمت عملية الاضافة بنجاح", StatusCodes.Status200OK, null);
    }

    public async Task<ResultViewModel> UpdateContact(UpdatedContact model)
    {
        var oldObject = await _unitOfWork.Repository<Contact>()
            .GetAllAsQueryable()
            .FirstOrDefaultAsync(c => c.Id == model.Id);

        if (oldObject == null)
            return new ResultViewModel(false, "There is no data to edit", "لا توجد بيانات للتعديل عليها", StatusCodes.Status404NotFound, null);

        var itemExist = await _unitOfWork.Repository<Contact>()
            .GetAllAsQueryable()
            .AnyAsync(c => c.Email == model.Email && c.Id != model.Id);

        if (itemExist)
            return new ResultViewModel(false, "Contact already exists", "رسالة التواصل موجودة مسبقاً", StatusCodes.Status500InternalServerError, null);

        oldObject.Name = model.Name;
        oldObject.Email = model.Email;
        oldObject.Phone = model.Phone;
        oldObject.Subject = model.Subject;
        oldObject.Message = model.Message;
        oldObject.ModificationDate = DateTime.UtcNow;

        await _unitOfWork.SaveChangesAsync();

        return new ResultViewModel(true, "The modification process was completed successfully", "تمت عملية التعديل بنجاح", StatusCodes.Status200OK, null);
    }

    public async Task<ResultViewModel> Delete(long id)
    {
        var deleteObject = await _unitOfWork.Repository<Contact>()
            .GetAllAsQueryable()
            .FirstOrDefaultAsync(c => c.Id == id);

        if (deleteObject == null)
            return new ResultViewModel(false, "There is no data to delete", "لا توجد بيانات لحذفها", StatusCodes.Status404NotFound, null);

        deleteObject.ModificationDate = DateTime.UtcNow;
        deleteObject.IsDeleted = true;
        _unitOfWork.Repository<Contact>().Update(deleteObject);
        await _unitOfWork.SaveChangesAsync();

        return new ResultViewModel(true, "The deletion was completed successfully", "تمت عملية الحذف بنجاح", StatusCodes.Status200OK, null);
    }
}