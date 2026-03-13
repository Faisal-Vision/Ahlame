using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Shared.Helpers
{
    public class JWTHelper(IOptions<AppSettings> _appSettings)
    {
        public string GenerateToken(long id, UserType userType)
        {
            var claims = GenerateClaims(id, userType);

            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Value.Secret));

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(4), // Use UTC time for consistency
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );

            var serializedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return serializedToken;
        }

        public List<Claim> GenerateClaims(long id, UserType userType)
        {
            var claims = new List<Claim>
        {
            new Claim("id", id.ToString()),
            new Claim("userType", ((int)userType).ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

            return claims;
        }
    }

}
