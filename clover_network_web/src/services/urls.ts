// export const BASE_URL =
//   'https://clover-network-service-fd0c2a440af1.herokuapp.com'

// const API_BASE = `${BASE_URL}/api`

const API_BASE = `/api`

export const API_URL = {
  //auth
  login: `${API_BASE}/authenticate/login-by-email`,
  register: `${API_BASE}/authenticate/signup-by-email`,
  logout: `${API_BASE}/authenticate/logout`,

  //user
  getUserInfo: `${API_BASE}/user/get-user-info`,
  getListAllGroupOfUser: `${API_BASE}/group/list-all-group-of-user`,
  updateProfile: `${API_BASE}/user/edit-profile`,
  updateAvatar: `${API_BASE}/user/change-user-avatar`,
  searchUser: `${API_BASE}/search/search-by`,

  //feed
  postFeed: `${API_BASE}/feed/post`,
  listFeed: `${API_BASE}/feed/list-user-home`,
  postComment: `${API_BASE}/feed/comment`,

  //group
  createGroup: `${API_BASE}/group/create-new-group`,
}
