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

  getUserInfo: () =>
    http.get<ResponseUserType>(API_URL.getUserInfo, {
      headers: authHeader(),
    }),

  updateProfile: (user: UpdateInfoType) =>
    http.post<ResponseUserType>(API_URL.updateProfile, null, {
      params: user,
      headers: authHeader(),
    }),

  uploadImage: (formData: FormData) =>
    http.post<ResponseUserType>(API_URL.updateAvatar, formData, {
      headers: Object.assign(authHeader(), {
        'content-type': 'multipart/form-data',
      }),
    }),

  searchUser: (keyword: string) =>
    http.get<ResponseSearchUserType>(API_URL.searchUser, {
      params: {
        keyword,
      },
      headers: authHeader(),
    }),

  // getListAllGroupOfUser: async () => {
  //   return await http.get(API_URL.getListAllGroupOfUser, {
  //     headers: authHeader(),
  //   });
  // },
}
