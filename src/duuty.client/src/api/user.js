import { postAsync, getAsync } from "./api-utils";

const userAPI = {
  changePassword: async (data, token) => {
    return await postAsync("/api/user/change-password", data, token);
  },

  becomeEmployer: async (data, token) => {
    return await postAsync("/api/user/become-employer", data, token);
  },

  applyJob: async (applicationData, token) => {
    return await postAsync("/api/user/apply", applicationData, token);
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

  fetchEmployerDetails: async (userId, token) => {
    if (!userId) {
      return {
        isSuccess: false,
        message: "User ID is required",
        data: null,
      };
    }
    return await getAsync(`/api/employer/profile?userId=${userId}`, token);
  },

  updateUserProfile: async (profileData, token) => {
    return await postAsync("/api/user/profile", profileData, token);
  },

  updateEmployerProfile: async (profileData, token) => {
    console.log("Updating employer profile with data:", profileData);
    return await postAsync("/api/employer/profile", profileData, token);
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
