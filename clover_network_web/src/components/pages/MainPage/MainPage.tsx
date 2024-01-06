import { Suspense, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
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

  const getUserInfoApi = useGetUserInfo(isLogin !== null)

  useEffect(() => {
    if (!isLogin) {
      router('/login')
      return
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (getUserInfoApi.isLoading) {
    return <LoadingPage />
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Clover Network</title>
        <meta name='description' content='Clover Network application' />
      </Helmet>
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
    </HelmetProvider>
  )
}

export default MainPage
