const BASE_URL = 'https://clover-network-service-fd0c2a440af1.herokuapp.com'

const API_BASE = `${BASE_URL}/api`

export const API_URL = {
  //user
  login: `${API_BASE}/authenticate/login-by-email`,
  register: `${API_BASE}/authenticate/signup-by-email`,
  getListAllGroupOfUser: `${API_BASE}/group/list-all-group-of-user`,
}
