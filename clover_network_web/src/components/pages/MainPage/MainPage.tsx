import { Suspense, useEffect, useState } from 'react'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { Outlet, useNavigate } from 'react-router-dom'

import { useGetUserInfo } from '@/hook'

import MainHeader from '@/components/organisms/MainHeader'
import LoadingPage from '@/components/pages/LoadingPage'
import { SpinnerIcon } from '@/components/atoms/Icons'

const MainPage = () => {
  const [suspended, setSuspended] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setSuspended((s) => (s ? s : !s)), 500)
  }, [])

  const router = useNavigate()

  const isFetching = useIsFetching()

  const isMutating = useIsMutating()

  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  const getUserInfoApi = useGetUserInfo()

  useEffect(() => {
    if (!isLogin) {
      router('/login')
      return
    }
  }, [])

  if (getUserInfoApi.isLoading) {
    return <LoadingPage />
  }

  return (
    <section>
      <MainHeader />
      <Suspense fallback={<LoadingPage />}>
        {suspended ? <Outlet /> : <LoadingPage />}
      </Suspense>
      {isFetching + isMutating !== 0 && (
        <div role='status' className='fixed bottom-10 right-10'>
          <SpinnerIcon />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </section>
  )
}

export default MainPage
