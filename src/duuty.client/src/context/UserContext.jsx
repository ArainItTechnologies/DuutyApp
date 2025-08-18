import { createContext, useState, useEffect } from "react";
import { roleChecks } from "../Constants";

// Create the User context
export const UserContext = createContext();
export const LoadingContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Get user data from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Whenever the user state changes, update localStorage
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Clear user info if logged out
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ...roleChecks(user) }}>
      {children}
    </UserContext.Provider>
  );
};

export const LoadingContextProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, isError, setError }}>
      {children}
    </LoadingContext.Provider>
  );
};
