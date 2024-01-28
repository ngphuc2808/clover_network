export const BASE_URL = 'https://clover-app-pju97.ondigitalocean.app'

const API_BASE = `${BASE_URL}/api`

export const API_URL = {
  //auth
  login: `${API_BASE}/authenticate/login-by-email`,
  register: `${API_BASE}/authenticate/signup-by-email`,
  logout: `${API_BASE}/authenticate/logout`,
  forgotPassword: `${API_BASE}/authenticate/forgot-password`,
  resetPassword: `${API_BASE}/authenticate/reset-password`,
  changePassword: `${API_BASE}/authenticate/change-password`,

  //user
  getUserInfo: `${API_BASE}/user/get-user-info`,
  getUserProfile: `${API_BASE}/user/get-user-profile`,
  updateProfile: `${API_BASE}/user/edit-profile`,
  updateAvatar: `${API_BASE}/user/change-user-avatar`,
  getListFriends: `${API_BASE}/user/get-list-friend`,
  getListFriendsRequest: `${API_BASE}/user/get-list-friend-request`,
  getListRecommend: `${API_BASE}/user/get-list-recommend`,
  getListFollowers: `${API_BASE}/user/get-list-connector`,
  getListFollowing: `${API_BASE}/user/get-list-connect`,

  //search
  searchKey: `${API_BASE}/search/search-by`,

  //feed
  postFeed: `${API_BASE}/feed/post`,
  listFeed: `${API_BASE}/feed/list-user-home-v2`,
  postComment: `${API_BASE}/feed/comment`,
  listFeedOfGroup: `${API_BASE}/feed/list-group-home`,
  listAllGroupHome: `${API_BASE}/feed/list-all-group-home`,
  getFeedDetail: `${API_BASE}/feed/detail`,
  getFeedLink: `${API_BASE}/feed/get-link-detail-feed`,
  getListComment: `${API_BASE}/feed/get-list-comment`,
  checkUserLike: `${API_BASE}/feed/check-user-like`,
  likeFeed: `${API_BASE}/feed/react`,
  disableFeed: `${API_BASE}/feed/disable-post`,

  //group
  createGroup: `${API_BASE}/group/create-new-group`,
  getGroupInfo: `${API_BASE}/group/get-group-info`,
  getListAllGroup: `${API_BASE}/group/list-all-group-of-user`,
  getListMemberGroup: `${API_BASE}/group/list-member-group`,
  getListMemberWaiting: `${API_BASE}/group/list-member-waiting`,
  updateBanner: `${API_BASE}/group/change-group-banner`,
  disableGroup: `${API_BASE}/group/disable-group`,
  joinGroup: `${API_BASE}/group/join`,
  checkCanPost: `${API_BASE}/group/canPost`,
  leaveGroup: `${API_BASE}/group/leave`,
  approveMember: `${API_BASE}/group/approve-member`,

  //connect
  connectUser: `${API_BASE}/connection/connect-user`,
}
