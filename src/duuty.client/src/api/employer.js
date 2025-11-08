import { postAsync, getAsync } from "./api-utils";

const employerAPI = {
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

  updateEmployerProfile: async (profileData, token) => {
    return await postAsync("/api/employer/profile", profileData, token);
  },

  postJob: async (jobData, token) => {
    try {
      const response = await postAsync("/api/employer/post-job", jobData, token);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Post job failed" };
    }
  },

  fetchJobs: async (userId, token) => {
    try {
      const response = await getAsync(
        `/api/employer/jobs?userId=${userId}`,
        token
      );
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Fetch jobs failed" };
    }
  }
};

export default employerAPI;