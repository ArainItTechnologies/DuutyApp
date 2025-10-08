export const normalizeClaims = (claims) => {
  let roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
  if (!Array.isArray(roles)) {
    roles = roles ? [roles] : [];
  }

  return {
    name: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    role: roles,
    email: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
  };
};
