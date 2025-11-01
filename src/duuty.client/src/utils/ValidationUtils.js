export const validateMobileNumber = (number) => {
  const mobileRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  return mobileRegex.test(number.replace(/\s+/g, ''));
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" };
  }
  if (!hasLowerCase) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" };
  }
  if (!hasNumber) {
    return { isValid: false, message: "Password must contain at least one number" };
  }
  if (!hasSpecialChar) {
    return { isValid: false, message: "Password must contain at least one special character" };
  }

  return { isValid: true, message: "" };
};

export const parseApiError = (error) => {
  // Default error message
  let errorMessage = "Something went wrong";
  
  // Function to extract error from error data object
  const extractErrorMessage = (errorData) => {
    if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      const firstError = errorData.errors[0];
      return firstError.code || firstError.reason || firstError.message;
    } else if (errorData.title) {
      return errorData.title;
    } else if (errorData.message) {
      return errorData.message;
    }
    return null;
  };

  // Check if it's an API response error with data at root level
  if (error?.data) {
    const errorData = error.data;
    
    const extracted = extractErrorMessage(errorData);
    if (extracted) {
      errorMessage = extracted;
    }
  }
  // Check if error data is nested in message property
  else if (error?.message && typeof error.message === 'object') {
    const errorData = error.message;
    
    const extracted = extractErrorMessage(errorData);
    if (extracted) {
      errorMessage = extracted;
    }
  }
  // Handle simple string messages
  else if (error?.message && typeof error.message === 'string') {
    errorMessage = error.message;
  } else if (error?.title) {
    errorMessage = error.title;
  }

  return errorMessage;
};