  export const validateMobileNumber = (number) => {
    const mobileRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    return mobileRegex.test(number.replace(/\s+/g, ''));
  };

  export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };