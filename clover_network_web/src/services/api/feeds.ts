import http from '../http'
import { API_URL } from '../urls'
import { authHeader } from '@/functions'

export const FeedsApi = {
  postFeed: (feed: FeedsType) =>
    http.post<ResponseFeedsType>(API_URL.postFeed, feed, {
      headers: authHeader(),
    }),
}
