import { postAsync } from "./api-utils";

const publicAPI = {
  registerUser: async (registerData) => {
    return await postAsync("/api/public/register", registerData);
  },

  confirmEmail: (userId, token) => {
    const data = {
      params: { userId, token },
    };
    return postAsync("/api/public/resend/confirm", null, token, data);
  },

  resetPassword: async (email) => {
    return await postAsync("/api/public/forgot-password", { email });
  },

  resendOtp: async (email, phoneNumber) => {
    return await postAsync("/api/public/resend/otp", { email, phoneNumber });
  },

  loginUser: async (loginData) => {
    const response = await postAsync("/api/public/login", loginData);
    return { success: true, data: response };
  },
  verifyOtp: async (otpData) => {
    const response = await postAsync("/api/public/verify-otp", otpData);
    return response;
  }
};

export default publicAPI;
