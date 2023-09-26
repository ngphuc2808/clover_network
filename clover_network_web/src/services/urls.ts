export const BASEURL = "https://clover-network-service.onrender.com";

const API_BASE = `${BASEURL}/api`;

export const API_URL = {
  login: `${API_BASE}/authenticate/login-by-email`,
  register: `${API_BASE}/authenticate/signup-by-email`,
};
