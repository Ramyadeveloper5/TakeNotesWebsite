export const isAuthenticated = () => {
  if (typeof window === "undefined") return false; // Prevent SSR error
  return !!localStorage.getItem("token"); // Returns true if token exists
};
  

  export const getUser = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        return user && user !== "undefined" ? JSON.parse(user) : null;
    }
    return null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // Redirect to login
};

