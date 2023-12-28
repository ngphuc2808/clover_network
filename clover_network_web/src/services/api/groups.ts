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

  getListMemberGroup: ({
    groupId,
    roleId,
    page,
    size,
  }: {
    groupId: string
    roleId: string
    page: string
    size: string
  }) =>
    http.get<ResponseListMemberGroupType>(API_URL.getListMemberGroup, {
      headers: authHeader(),
      params: {
        groupId,
        roleId,
        page,
        size,
      },
    }),
}
