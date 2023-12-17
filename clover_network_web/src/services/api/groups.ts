import http from '../http'
import { API_URL } from '../urls'
import { authHeader } from '@/functions'

export const GroupsApi = {
  createGroup: (group: CreateGroupType) =>
    http.post<ResponseCreateGroupType>(API_URL.createGroup, group, {
      headers: authHeader(),
    }),
}
