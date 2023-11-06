import { useEffect, useState } from 'react'
import { UseQueryOptions, useMutation, useQuery } from 'react-query'

import { UsersApi } from '@/services/api/users'

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
