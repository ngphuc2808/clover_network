import http from '../http'
import { API_URL } from '../urls'
import { authHeader } from '@/functions'

export const UsersApi = {
  logout: (tokenId: string) =>
    http.delete<ResponseLogoutType>(API_URL.logout, {
      params: {
        tokenId,
      },
      headers: authHeader(),
    }),

  login: (user: LoginType) => http.post<ResponseLoginType>(API_URL.login, user),

  register: (user: RegisterType) =>
    http.post<ResponseUserType>(API_URL.register, user),

  forgotPassword: (email: string) =>
    http.get<ResponseForgotPasswordType>(API_URL.forgotPassword, {
      params: {
        email,
      },
    }),

  resetPassword: (data: ResetPasswordType) =>
    http.post<ResponseForgotPasswordType>(API_URL.resetPassword, data),

  changePassword: (data: ChangePasswordType) =>
    http.post<ResponseChangePasswordType>(API_URL.changePassword, data, {
      headers: authHeader(),
    }),

  getUserInfo: () =>
    http.get<ResponseUserType>(API_URL.getUserInfo, {
      headers: authHeader(),
    }),

  getUserProfile: (id: string) =>
    http.get<ResponseUserProfileType>(`${API_URL.getUserProfile}/${id}`, {
      headers: authHeader(),
    }),

  updateProfile: (user: UpdateInfoType) =>
    http.post<ResponseUserType>(API_URL.updateProfile, null, {
      params: user,
      headers: authHeader(),
    }),

  uploadAvatar: (formData: FormData) =>
    http.post<ResponseUserType>(API_URL.updateAvatar, formData, {
      headers: Object.assign(authHeader(), {
        'content-type': 'multipart/form-data',
      }),
    }),

  searchKey: (keyword: string) =>
    http.get<ResponseSearchUserType>(API_URL.searchKey, {
      params: {
        keyword,
      },
      headers: authHeader(),
    }),

  getListFollowers: (userId: string, page: number) =>
    http.get<ResponseListFollowType>(API_URL.getListFollowers, {
      headers: authHeader(),
      params: {
        userId,
        page,
        size: 20,
      },
    }),

  getListFollowing: (userId: string, page: number) =>
    http.get<ResponseListFollowType>(API_URL.getListFollowing, {
      headers: authHeader(),
      params: {
        userId,
        page,
        size: 20,
      },
    }),

  connectUser: (data: { targetUserId: string; status: number }) =>
    http.post<ResponseConnectUserType>(API_URL.connectUser, data, {
      headers: authHeader(),
    }),
}
