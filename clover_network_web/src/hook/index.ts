import { RefObject, useEffect, useState } from 'react'
import {
  UseQueryOptions,
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import type { QueryKey } from '@tanstack/react-query'

import { UsersApi } from '@/services/api/users'
import { FeedsApi } from '@/services/api/feeds'
import { GroupsApi } from '@/services/api/groups'

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      handleClick(e)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [ref, callback])
}

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

export const handleGetUserProfile = async (id: string) => {
  const { data } = await UsersApi.getUserProfile(id)
  return data
}

export const handleSearchUserInfo = async (keyword: string) => {
  const { data } = await UsersApi.searchKey(keyword)
  return data
}

export const handleGetListFollowers = async (
  {
    pageParam,
  }: {
    pageParam: number
  },
  userId: string,
) => {
  const { data } = await UsersApi.getListFollowers(userId, pageParam - 1)
  return data
}

export const handleGetListFollowing = async (
  {
    pageParam,
  }: {
    pageParam: number
  },
  userId: string,
) => {
  const { data } = await UsersApi.getListFollowing(userId, pageParam - 1)
  return data
}

export const useGetUserInfo = (
  enabled: boolean,
  options?: UseQueryOptions<ResponseUserType>,
) => {
  return useQuery({
    queryKey: ['UserInfo'],
    queryFn: () => handleGetUserInfo(),
    staleTime: 5000,
    retry: 2,
    placeholderData: keepPreviousData,
    enabled: enabled,
    ...options,
  })
}

export const useGetOtp = () => {
  return useMutation({
    mutationFn: (body: string) => {
      return UsersApi.forgotPassword(body)
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (body: ResetPasswordType) => {
      return UsersApi.resetPassword(body)
    },
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (body: ChangePasswordType) => {
      return UsersApi.changePassword(body)
    },
  })
}

export const useGetUserProfile = (
  id: string,
  options?: UseQueryOptions<ResponseUserProfileType>,
) => {
  return useQuery({
    queryKey: ['UserProfile', { id }],
    queryFn: () => handleGetUserProfile(id),
    staleTime: 10000,
    retry: 2,
    placeholderData: keepPreviousData,
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

export const usePostUploadAvatar = () => {
  return useMutation({
    mutationFn: (file: FormData) => {
      return UsersApi.uploadAvatar(file)
    },
  })
}

export const usePostUploadBanner = () => {
  return useMutation({
    mutationFn: (file: FormData) => {
      return GroupsApi.uploadBanner(file)
    },
  })
}

export const useGetSearchInfo = (
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

export const usePostConnectUser = () => {
  return useMutation({
    mutationFn: (data: { targetUserId: string; status: number }) => {
      return UsersApi.connectUser(data)
    },
  })
}

export const useGetListFollowers = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ['ListFollowers', { userId }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => handleGetListFollowers({ pageParam }, userId),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data !== null ? allPages.length + 1 : undefined
      return nextPage
    },
  })
}

export const useGetListFollowing = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ['ListFollowing', { userId }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => handleGetListFollowing({ pageParam }, userId),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data !== null ? allPages.length + 1 : undefined
      return nextPage
    },
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

export const handleCheckCanPost = async (groupId: string) => {
  const { data } = await GroupsApi.checkCanPost(groupId)
  return data
}

export const handleGetListAllGroupHome = async ({
  pageParam,
}: {
  pageParam: number
}) => {
  const { data } = await FeedsApi.listAllGroupHome(pageParam - 1)
  return data
}

export const handleGetListFeedOfGroup = async (
  {
    pageParam,
  }: {
    pageParam: number
  },
  groupId: string,
) => {
  const { data } = await FeedsApi.listFeedOfGroup(pageParam - 1, groupId)
  return data
}

export const handleGetListComment = async (
  {
    pageParam,
  }: {
    pageParam: number
  },
  feedId: string,
) => {
  const { data } = await FeedsApi.getListComment(pageParam - 1, feedId)
  return data
}

export const usePostFeed = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return FeedsApi.postFeed(data)
    },
  })
}

export const useGetUserLike = () => {
  return useMutation({
    mutationFn: (feedId: string) => {
      return FeedsApi.checkUserLike(feedId)
    },
  })
}

export const useGetFeedDetail = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return FeedsApi.getFeedDetail(id)
    },
  })
}

export const useGetFeedLink = () => {
  return useMutation({
    mutationFn: (feedId: string) => {
      return FeedsApi.getFeedLink(feedId)
    },
  })
}

export const useGetListComment = (feedId: string) => {
  return useInfiniteQuery({
    queryKey: ['ListComment', { feedId }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => handleGetListComment({ pageParam }, feedId),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.data.length > 0 ? allPages.length + 1 : undefined
      return nextPage
    },
    enabled: !!feedId,
  })
}

export const usePostComment = () => {
  return useMutation({
    mutationFn: (body: FeedCommentType) => {
      return FeedsApi.postComment(body)
    },
  })
}

export const usePostLike = () => {
  return useMutation({
    mutationFn: (body: {
      postId: string
      reactType: string | null
      status: number
    }) => {
      return FeedsApi.postLike(body)
    },
  })
}

export const useCheckCanPostFeed = (
  groupId: string,
  options?: UseQueryOptions<boolean>,
) => {
  return useQuery({
    queryKey: ['CheckCanPost', { groupId }],
    queryFn: () => handleCheckCanPost(groupId),
    retry: 2,
    enabled: !!groupId,
    ...options,
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
    gcTime: 0,
  })
}

export const useGetListAllGroupHome = (enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ['ListAllGroupHome'],
    initialPageParam: 1,
    queryFn: handleGetListAllGroupHome,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data ? allPages.length + 1 : undefined
      return nextPage
    },
    enabled: enabled,
    gcTime: 0,
  })
}

export const useGetListFeedOfGroup = (groupId: string, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: ['ListFeedOfGroup', { groupId }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      handleGetListFeedOfGroup({ pageParam }, groupId),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data ? allPages.length + 1 : undefined
      return nextPage
    },
    enabled: !!groupId && enabled,
    gcTime: 0,
  })
}

//Groups
export const handleGetAllListGroup = async () => {
  const { data } = await GroupsApi.getListAllGroup()
  return data
}

export const handleGetGroupInfo = async (id: string) => {
  const { data } = await GroupsApi.getGroupInfo(id)
  return data
}

export const handleGetListMemberWaitingGroup = async (groupId: string) => {
  const { data } = await GroupsApi.getListMemberWaiting(groupId)
  return data
}

export const handleGetListMemberGroup = async (
  {
    pageParam,
  }: {
    pageParam: number
  },
  groupId: string,
  roleId: string,
) => {
  const { data } = await GroupsApi.getListMemberGroup(
    pageParam - 1,
    groupId,
    roleId,
  )
  return data
}

export const usePostCreateGroup = () => {
  return useMutation({
    mutationFn: (body: CreateGroupType) => {
      return GroupsApi.createGroup(body)
    },
  })
}

export const useJoinGroup = () => {
  return useMutation({
    mutationFn: (groupId: string) => {
      return GroupsApi.joinGroup(groupId)
    },
  })
}

export const useLeaveGroup = () => {
  return useMutation({
    mutationFn: (groupId: string) => {
      return GroupsApi.leaveGroup(groupId)
    },
  })
}

export const useDisableGroup = () => {
  return useMutation({
    mutationFn: (groupId: string) => {
      return GroupsApi.disableGroup(groupId)
    },
  })
}

export const useApproveMember = () => {
  return useMutation({
    mutationFn: (data: { groupId: string; userId: string }) => {
      return GroupsApi.approveMember(data)
    },
  })
}

export const useGetListAllGroup = (
  options?: UseQueryOptions<ResponseGetListGroupType>,
) => {
  return useQuery({
    queryKey: ['ListAllGroup'],
    queryFn: () => handleGetAllListGroup(),
    retry: 2,
    ...options,
  })
}

export const useGetListMemberWaiting = (
  groupId: string,
  enabled: boolean,
  options?: UseQueryOptions<ResponseListMemberWaitingType>,
) => {
  return useQuery({
    queryKey: ['ListMemberWaiting'],
    queryFn: () => handleGetListMemberWaitingGroup(groupId),
    staleTime: 5000,
    retry: 2,
    enabled: enabled,
    ...options,
  })
}

export const useGetGroupInfo = (
  id: string,
  options?: UseQueryOptions<ResponseGetGroupInfoType>,
) => {
  return useQuery({
    queryKey: ['GroupInfo', { id }],
    queryFn: () => handleGetGroupInfo(id),
    retry: 2,
    ...options,
  })
}

export const useGetListMemberGroup = (groupId: string, roleId: string) => {
  return useInfiniteQuery({
    queryKey: ['ListMembers', { groupId, roleId }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      handleGetListMemberGroup({ pageParam }, groupId, roleId),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.data.members?.length! > 0 ? allPages.length + 1 : undefined
      return nextPage
    },
  })
}
