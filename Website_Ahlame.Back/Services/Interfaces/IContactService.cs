using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{

    public record CreatedContact(
         string Name,
         string Email,
         string? Phone,
         string? Subject,
         string Message
     );

    public record UpdatedContact(
        long Id,
        string Name,
        string Email,
        string? Phone,
        string? Subject,
        string Message
    );

    public interface IContactService
    {
        Task<ResultViewModel> GetAll();
        Task<ResultViewModel> GetById(long Id);
        Task<ResultViewModel> AddContact(CreatedContact model);
        Task<ResultViewModel> UpdateContact(UpdatedContact model);
        Task<ResultViewModel> Delete(long id);

    }


}
