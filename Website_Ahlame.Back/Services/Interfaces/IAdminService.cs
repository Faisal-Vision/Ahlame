using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{

    public record CreatedAdmin
        (
         long Nid,
         string ArabicName,
         string? EnglishName,
         string Email,
         string Password,
         UserType UserType
        );

    public record UpdatedAdmin
        (
        long Id,
         long Nid,
         string ArabicName,
         string? EnglishName,
         string Email,
         string? Password,
         UserType UserType
        );
    public interface IAdminService
    {
        Task<ResultViewModel> GetAll();
        Task<ResultViewModel> GetById(long Id);
        Task<ResultViewModel> AddAdmin(CreatedAdmin model);
        Task<ResultViewModel> UpdateAdmin(UpdatedAdmin model);
        Task<ResultViewModel> Delete(long id);

    }


}
