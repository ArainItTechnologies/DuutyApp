export const normalizeClaims = (claims) => ({
  name: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
  role: claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
  email: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
});