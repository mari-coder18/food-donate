//  GET TOKEN: 
export const getToken = () => {
  return localStorage.getItem("token");
};

// GET ROLE:
export const getRole = () => {
  const role = localStorage.getItem("role");
  return role ? role.trim().toLowerCase() : "";
};

//  NEW: GET USER OBJECT 

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : {};
  } catch (err) {
    console.log("Error parsing user object da:", err);
    return {};
  }
};

// SET AUTH: 
export const setAuth = (token, user, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user || {}));
  
  // trim() 
  const safeRole = typeof role === "string" ? role.trim().toLowerCase() : String(role || "");
  localStorage.setItem("role", safeRole);
};

//  CLEAR AUTH: 
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};