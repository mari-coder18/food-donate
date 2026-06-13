export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const setAuth = (token, user, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("role", role.trim().toLowerCase());
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};