import { postAsync } from "./api-utils";
export const postJob = async (jobData, token) => {
  try {
    const response = await postAsync("/api/employer/post-job", jobData, token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Post job failed" };
  }
};