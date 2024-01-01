import http from '../http'
import { API_URL } from '../urls'
import { authHeader } from '@/functions'

export const FeedsApi = {
  getFeedDetail: (id: string) =>
    http.get<ResponseFeedDetail>(`${API_URL.getFeedDetail}/${id}`, {
      headers: authHeader(),
    }),

  getFeedLink: (feedId: string) =>
    http.get<ResponseGetLinkFeed>(API_URL.getFeedLink, {
      headers: authHeader(),
      params: {
        feedId,
      },
    }),

  getListComment: (page: number, feedId: string) =>
    http.get<ResponseListCommentType>(API_URL.getListComment, {
      params: { size: 5, page, feedId },
      headers: authHeader(),
    }),

  postFeed: (data: FormData) =>
    http.post<ResponseFeedsType>(API_URL.postFeed, data, {
      headers: Object.assign(authHeader(), {
        'content-type': 'multipart/form-data',
      }),
    }),

  postComment: (comment: FeedCommentType) =>
    http.post<ResponseListCommentType>(API_URL.postComment, comment, {
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

  checkUserLike: (feedId: string) =>
    http.get<ResponseCheckUserLikeType>(API_URL.checkUserLike, {
      params: { feedId },
      headers: authHeader(),
    }),

  postLike: (data: {
    postId: string
    reactType: string | null
    status: number
  }) =>
    http.post<ResponseLikeType>(API_URL.likeFeed, data, {
      headers: authHeader(),
    }),
}
