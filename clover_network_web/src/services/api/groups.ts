import http from '../http'
import { API_URL } from '../urls'
import { authHeader } from '@/functions'

export const GroupsApi = {
  createGroup: (group: CreateGroupType) =>
    http.post<ResponseCreateGroupType>(API_URL.createGroup, group, {
      headers: authHeader(),
    }),

  uploadBanner: (formData: FormData) =>
    http.post<ResponseUserType>(API_URL.updateBanner, formData, {
      headers: Object.assign(authHeader(), {
        'content-type': 'multipart/form-data',
      }),
    }),

  checkCanPost: (groupId: string) =>
    http.get<boolean>(API_URL.checkCanPost, {
      headers: authHeader(),
      params: {
        groupId,
      },
    }),

  leaveGroup: (groupId: string) =>
    http.get<ResponseJoinLeaveGroupType>(API_URL.leaveGroup, {
      headers: authHeader(),
      params: {
        groupId,
      },
    }),

  getGroupInfo: (id: string) =>
    http.get<ResponseGetGroupInfoType>(`${API_URL.getGroupInfo}/${id}`, {
      headers: authHeader(),
    }),

  getListAllGroup: () =>
    http.get<ResponseGetListGroupType>(API_URL.getListAllGroup, {
      headers: authHeader(),
    }),

  getListMemberGroup: (page: number, groupId: string, roleId: string) =>
    http.get<ResponseListMemberGroupType>(API_URL.getListMemberGroup, {
      headers: authHeader(),
      params: {
        groupId,
        page,
        roleId,
        size: 20,
      },
    }),

  getListMemberWaiting: (groupId: string) =>
    http.get<ResponseListMemberWaitingType>(API_URL.getListMemberWaiting, {
      headers: authHeader(),
      params: {
        groupId,
      },
    }),

  approveMember: (data: { groupId: string; userId: string }) =>
    http.post<any>(API_URL.approveMember, data, {
      headers: authHeader(),
    }),

  joinGroup: (groupId: string) =>
    http.post<ResponseJoinLeaveGroupType>(API_URL.joinGroup, null, {
      params: {
        groupId,
      },
      headers: authHeader(),
    }),

  disableGroup: (groupId: string) =>
    http.post<ResponseDeleteGroupType>(API_URL.disableGroup, null, {
      params: {
        groupId,
        confirm: 'true',
      },
      headers: authHeader(),
    }),
}
