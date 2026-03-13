namespace Services.Base;

public record CreateLKPEntity(string ArabicName, string EnglishName);
public record UpdateLKPEntity(long Id, string ArabicName, string EnglishName);

public class LKPBaseService<TClass>(IUnitOfWork _unitOfWork)
    where TClass : BaseLKP
{

    public async Task<ResultViewModel> GetAll()
    {
        var data = await _unitOfWork.Repository<TClass>()
                            .GetAllAsQueryable()
                            .AsNoTracking()
                            .Select(_ => new
                            {
                                _.Id,
                                _.ArabicName,
                                _.EnglishName
                            }).ToListAsync();

        return new ResultViewModel(true, "All data is returned successfully", "تم استرجاع البيانات بنجاح", StatusCodes.Status200OK, data);
    }

    public async Task<ResultViewModel> Create(CreateLKPEntity model)
    {
        _unitOfWork.Repository<TClass>()
            .Add(model.Adapt<TClass>());

        await _unitOfWork.SaveChangesAsync();
        return new ResultViewModel(true, "All data is saved successfully", "تم حفظ البيانات بنجاح", StatusCodes.Status201Created, null);
    }

    public async Task<ResultViewModel> Update(UpdateLKPEntity model)
    {
        _unitOfWork.Repository<TClass>().Update(model.Adapt<TClass>());
        await _unitOfWork.SaveChangesAsync();
        return new ResultViewModel(true, "All data is saved successfully", "تم تعديل البيانات بنجاح", StatusCodes.Status200OK, model.Id);
    }

    public async Task<ResultViewModel> Delete(long id)
    {
        var entity = await _unitOfWork.Repository<TClass>()
            .GetAllAsQueryable()
            .FirstOrDefaultAsync(x => x.Id == id);

        _unitOfWork.Repository<TClass>().Delete(entity!);
        await _unitOfWork.SaveChangesAsync();
        return new ResultViewModel(true, "All data is saved successfully", "تم حذف البيانات بنجاح", StatusCodes.Status200OK, id);
    }
}

