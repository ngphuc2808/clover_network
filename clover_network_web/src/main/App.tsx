import NotFoundPage from '@/components/pages/NotFoundPage'
import ForgotPasswordPage from '@/components/templates/ForgotPasswordPage'
import React, { Suspense, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const HomePage = React.lazy(() => import('@/components/templates/HomePage'))
const LoginPage = React.lazy(() => import('@/components/templates/LoginPage'))
const RegisterPage = React.lazy(
  () => import('@/components/templates/RegisterPage'),
)

const Loading = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='flex items-center justify-center space-x-1 text-sm text-primaryColor'>
        <svg
          fill='none'
          className='h-16 w-16 animate-spin text-primaryColor'
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
            fill='currentColor'
            fillRule='evenodd'
          />
        </svg>
        <div className='text-lg'>Loading ...</div>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const [suspended, setSuspended] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => setSuspended((s) => (s ? s : !s)), 500)
  }, [])

  const elements = useRoutes([
    { path: '*', element: <NotFoundPage /> },

    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/login/identify',
      element: <ForgotPasswordPage />,
    },
  ])

  return (
    <div className='App'>
      <Suspense fallback={<Loading />}>
        {suspended ? (
          <>
            {elements}
            <ToastContainer
              position='bottom-right'
              autoClose={1500}
              bodyClassName='font-beVietnam text-sm'
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </>
        ) : (
          <Loading />
        )}
      </Suspense>
    </div>
  )
}

export default App
