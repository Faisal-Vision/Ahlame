using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController(IAdminService _adminService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _adminService.GetAll());
        }

        [HttpGet]
        public async Task<IActionResult> GetById(long Id)
        {
            return Ok(await _adminService.GetById(Id));
        }

        [HttpPost]
        public async Task<IActionResult> AddAdmin(CreatedAdmin model)
        {
            return Ok(await _adminService.AddAdmin(model));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAdmin(UpdatedAdmin model)
        {
            return Ok(await _adminService.UpdateAdmin(model));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long Id)
        {
            return Ok(await _adminService.Delete(Id));
        }

    }
}
