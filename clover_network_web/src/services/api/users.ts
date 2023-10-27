import http from "../http";
import { API_URL } from "../urls";
// import { authHeader } from "@/functions";

export const UsersApi = {
  login: (user: LoginType) => http.post<ResponseLoginType>(API_URL.login, user),

  register: (user: RegisterType) =>
    http.post<ResponseRegisterType>(API_URL.register, user),

  // getListAllGroupOfUser: async () => {
  //   return await http.get(API_URL.getListAllGroupOfUser, {
  //     headers: authHeader(),
  //   });
  // },
};
