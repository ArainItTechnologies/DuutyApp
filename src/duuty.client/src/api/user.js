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

  fetchJobs: async (jobLocation, jobState, preferredJob, user) => {
    return await getAsync("/api/user/jobs", user?.token, {
      params: {
        jobLocation,
        jobState,
        preferredJob,
        userId: user?.userId,
      }
    });
  },
};

export default userAPI;