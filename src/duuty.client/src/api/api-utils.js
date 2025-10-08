import axios from "axios";

const postAsync = async (endpoint, data, token, options = {}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers, // Allow additional headers
      },
      timeout: options.timeout || 10000, // Default 10s timeout
      ...options, // Allow additional axios options
    };

    const response = await axios.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    // Enhanced error handling
    const errorMessage = error.response?.data?.message || 
                        error.response?.data || 
                        error.message || 
                        "Request failed";
    
    throw {
      message: errorMessage,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    };
  }
};

const getAsync = async (endpoint, token, options = {}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers, // Allow additional headers
      },
      timeout: options.timeout || 10000, // Default 10s timeout
      params: options.params, // Query parameters
      ...options, // Allow additional axios options
    };

    const response = await axios.get(endpoint, config);
    return response.data;
  } catch (error) {
    // Enhanced error handling
    const errorMessage = error.response?.data?.message || 
                        error.response?.data || 
                        error.message || 
                        "Request failed";
    
    throw {
      message: errorMessage,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    };
  }
};

export { postAsync, getAsync };
