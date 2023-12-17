import { useEffect, useState } from 'react'
import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import type { QueryKey } from '@tanstack/react-query'

import { UsersApi } from '@/services/api/users'
import { FeedsApi } from '@/services/api/feeds'
import { GroupsApi } from '@/services/api/groups'

export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px'
      const scrollHeight = textAreaRef.scrollHeight
      textAreaRef.style.height = scrollHeight + 'px'
    }
  }, [textAreaRef, value])
}

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}

export const useGetFetchQuery = <T>(name: QueryKey) => {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<T>(name)
}

//Auth
export const usePostLogin = () => {
  return useMutation({
    mutationFn: (body: LoginType) => {
      return UsersApi.login(body)
    },
  })
}

export const useDeleteLogout = () => {
  return useMutation({
    mutationFn: (body: string) => {
      return UsersApi.logout(body)
    },
  })
}

export const usePostRegister = () => {
  return useMutation({
    mutationFn: (body: RegisterType) => {
      return UsersApi.register(body)
    },
  })
}

//User
export const handleGetUserInfo = async () => {
  const { data } = await UsersApi.getUserInfo()
  return data
}

export const handleSearchUserInfo = async (keyword: string) => {
  const { data } = await UsersApi.searchUser(keyword)
  return data
}

export const useGetUserInfo = (options?: UseQueryOptions<ResponseUserType>) => {
  return useQuery({
    queryKey: ['UserInfo'],
    queryFn: () => handleGetUserInfo(),
    staleTime: 5000,
    retry: 2,
    ...options,
  })
}

export const usePostUpdateProfile = () => {
  return useMutation({
    mutationFn: (body: UpdateInfoType) => {
      return UsersApi.updateProfile(body)
    },
  })
}

export const usePostImage = () => {
  return useMutation({
    mutationFn: (file: FormData) => {
      return UsersApi.uploadImage(file)
    },
  })
}

export const useGetSearchUserInfo = (
  keyword: string,
  options?: UseQueryOptions<ResponseSearchUserType>,
) => {
  return useQuery({
    queryKey: ['SearchUserInfo', keyword],
    queryFn: () => handleSearchUserInfo(keyword),
    enabled: Boolean(keyword),
    ...options,
  })
}

//Feed
export const handleGetListFeed = async ({
  pageParam,
}: {
  pageParam: number
}) => {
  const { data } = await FeedsApi.listFeed(pageParam - 1)
  return data
}

export const usePostFeed = () => {
  return useMutation({
    mutationFn: (body: FeedsType) => {
      return FeedsApi.postFeed(body)
    },
  })
}

export const usePostComment = () => {
  return useMutation({
    mutationFn: (body: FeedCommentType) => {
      return FeedsApi.postComment(body)
    },
  })
}

export const useGetListFeed = () => {
  return useInfiniteQuery({
    queryKey: ['ListFeed'],
    initialPageParam: 1,
    queryFn: handleGetListFeed,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data ? allPages.length + 1 : undefined
      return nextPage
    },
  })
}

//Groups
export const usePostCreateGroup = () => {
  return useMutation({
    mutationFn: (body: CreateGroupType) => {
      return GroupsApi.createGroup(body)
    },
  })
}
