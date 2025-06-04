import axios from "axios";

export const registerUser = async (registerData) => {
  try {
    const response = await axios.post("api/register", registerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const confirmEmail = (userId, token) => {
  return axios.post("/api/confirm", null, {
    params: { userId, token },
  });
};

export const resetPassword = async (email) => {
  try {
    return await axios.post("/api/forgot-password", { email });
  } catch (error) {
    throw error.response?.data || { message: "Reset password failed" };
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post("/api/login", loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const changePassword = async (data, token) => {
  try {
    const response = await axios.post("/api/change-password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Change password failed" };
  }
};

export const fetchJobs = async (jobLocation, jobState, preferredJob, token) => {
  try {
    const response = await axios.get("/api/jobs", {
      params: {
        jobLocation,
        jobState,
        preferredJob,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Fetch jobs failed" };
  }
};

export const becomeEmployer = async (data, token) => {
  console.log(data)
  try {
    const response = await axios.post("/api/user/become-employer", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Become Employer failed" };
  }
};

export const postJob = async (jobData, token) => {
  try {
    const response = await axios.post("/api/post-job", jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Post job failed" };
  }
};

export const applyJob = async (applicationData, token) => {
  try {
    const response = await axios.post("/api/apply", applicationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Apply job failed" };
  }
}
