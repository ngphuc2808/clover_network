import http from '../http'
import { API_URL } from '../urls'
import { authHeader } from '@/functions'

export const FeedsApi = {
  postFeed: (feed: FeedsType) =>
    http.post<ResponseFeedsType>(API_URL.postFeed, feed, {
      headers: authHeader(),
    }),

  postComment: (comment: FeedCommentType) =>
    http.post<any>(API_URL.postComment, comment, {
      headers: authHeader(),
    }),

  listFeed: (offset: number) =>
    http.get<ResponseListFeedType>(API_URL.listFeed, {
      params: { limit: 4, offset },
      headers: authHeader(),
    }),
}
