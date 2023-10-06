const BASE_URL = "https://47.128.64.91:8080";
const API_BASE = `${BASE_URL}/api`;

export const API_URL = {
  login: `${API_BASE}/authenticate/login-by-email`,
  register: `${API_BASE}/authenticate/signup-by-email`,
  getListAllGroupOfUser: `${API_BASE}/group/list-all-group-of-user`,
};
