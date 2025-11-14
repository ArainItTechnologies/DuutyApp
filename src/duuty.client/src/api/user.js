import { postAsync, getAsync } from "./api-utils";

const userAPI = {
  changePassword: async (data, token) => {
    return await postAsync("/api/user/change-password", data, token);
  },

  becomeEmployer: async (data, token) => {
    return await postAsync("/api/user/become-employer", data, token);
  },

  applyJob: async (applicationData, token) => {
    try{
      return await postAsync("/api/user/apply", applicationData, token);
    } catch (error) {
      var errorMessage = parseApiError(error);
      throw error.response?.data || { message: errorMessage };
    }
  },

  fetchUserDetails: async (userId, token) => {
    if (!userId) {
      return {
        isSuccess: false,
        message: "User ID is required",
        data: null,
      };
    }
    return await getAsync(`/api/user/profile?userId=${userId}`, token);
  },

  updateUserProfile: async (profileData, token) => {
    return await postAsync("/api/user/profile", profileData, token);
  },

  fetchJobs: async (jobLocation, jobState, preferredJob, user) => {
    return await getAsync("/api/user/jobs", user?.token, {
      params: {
        jobLocation,
        jobState,
        preferredJob,
        userId: user?.userId,
      },
    });
  },
};

export default userAPI;
