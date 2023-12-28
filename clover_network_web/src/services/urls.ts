export const BASE_URL = 'https://clover-network-app-rok7a.ondigitalocean.app'

const API_BASE = `${BASE_URL}/api`

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
  listFeedOfGroup: `${API_BASE}/feed/list-group-home`,

  //group
  createGroup: `${API_BASE}/group/create-new-group`,
  getGroupInfo: `${API_BASE}/group/get-group-info`,
  getListAllGroup: `${API_BASE}/group/list-all-group-of-user`,
}
