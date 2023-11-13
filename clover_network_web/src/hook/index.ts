import { useEffect, useState } from 'react'
import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

import { UsersApi } from '@/services/api/users'
import { FeedsApi } from '@/services/api/feeds'

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

export default useAutosizeTextArea

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

export const useGetFetchQuery = <T>(name: string) => {
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

export const useGetUserInfo = (options?: UseQueryOptions<ResponseUserType>) => {
  return useQuery({
    queryKey: ['UserInfo'],
    queryFn: () => handleGetUserInfo(),
    staleTime: 5000,
    keepPreviousData: true,
    retry: 2,
    ...options,
  })
}

//Feed
export const usePostFeed = () => {
  return useMutation({
    mutationFn: (body: FeedsType) => {
      return FeedsApi.postFeed(body)
    },
  })
}
