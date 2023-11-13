const BASE_URL = 'https://clover-network-service-fd0c2a440af1.herokuapp.com'

const API_BASE = `${BASE_URL}/api`

export const API_URL = {
  //auth
  login: `${API_BASE}/authenticate/login-by-email`,
  register: `${API_BASE}/authenticate/signup-by-email`,

  //user
  getUserInfo: `${API_BASE}/user/get-user-info`,
  getListAllGroupOfUser: `${API_BASE}/group/list-all-group-of-user`,

  //feed
  postFeed: `${API_BASE}/feed/post`,
}
