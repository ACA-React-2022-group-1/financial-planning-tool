  export const STORAGE_AUTH_USER_KEY = "STORAGE_AUTH_USER";
  
  /**
   * Authorized user information and functions for manipulating that data.
   * This information should be save in global store.
   * This hook is a basic example
   */
  export const useAuth = () => {
  
    const getUser = () => {
      const user = localStorage.getItem(STORAGE_AUTH_USER_KEY);
       return user
         ? JSON.parse(user)
         : null
    };
  
    const updateUser = (user) => {
      localStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(user));
    };
  
    const refreshToken = () => {
      // refresh user token and update on store
    };
  
    const logout = () => {
      localStorage.removeItem(STORAGE_AUTH_USER_KEY);
    };
  
    return {
      updateUser,
      refreshToken,
      logout,
      getUser
    };
  };