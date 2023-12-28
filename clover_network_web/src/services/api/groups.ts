import http from '../http'
import { API_URL } from '../urls'
import { authHeader } from '@/functions'

export const GroupsApi = {
  createGroup: (group: CreateGroupType) =>
    http.post<ResponseCreateGroupType>(API_URL.createGroup, group, {
      headers: authHeader(),
    }),

  getGroupInfo: (id: string) =>
    http.get<ResponseGetGroupInfoType>(`${API_URL.getGroupInfo}/${id}`, {
      headers: authHeader(),
    }),

  getListAllGroup: () =>
    http.get<ResponseGetListGroupType>(API_URL.getListAllGroup, {
      headers: authHeader(),
    }),
}
