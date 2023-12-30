import http from '../http'
import { API_URL } from '../urls'
import { authHeader } from '@/functions'

export const FeedsApi = {
  postFeed: (data: FormData) =>
    http.post<ResponseFeedsType>(API_URL.postFeed, data, {
      headers: Object.assign(authHeader(), {
        'content-type': 'multipart/form-data',
      }),
    }),

  postComment: (comment: FeedCommentType) =>
    http.post<any>(API_URL.postComment, comment, {
      headers: authHeader(),
    }),

  listFeed: (page: number) =>
    http.get<ResponseFeedCardType>(API_URL.listFeed, {
      params: { size: 5, page },
      headers: authHeader(),
    }),

  listFeedOfGroup: (page: number, groupId: string) =>
    http.get<ResponseFeedCardType>(API_URL.listFeedOfGroup, {
      params: { size: 5, page, groupId },
      headers: authHeader(),
    }),

  listAllGroupHome: (page: number) =>
    http.get<ResponseFeedCardType>(API_URL.listAllGroupHome, {
      params: { size: 5, page },
      headers: authHeader(),
    }),
}
