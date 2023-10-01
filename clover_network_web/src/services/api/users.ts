import { authHeader } from "@/functions";
import http from "../http";

import { API_URL } from "../urls";

export const UsersApi = {
  login: async (user: iAccountLogin): Promise<any> => {
    return await http.post(API_URL.login, user);
  },
  register: async (user: iAccountRegister): Promise<any> => {
    return await http.post(API_URL.register, user);
  },
  getListAllGroupOfUser: async () => {
    return await http.get(API_URL.getListAllGroupOfUser, {
      headers: authHeader(),
    });
  },
};
