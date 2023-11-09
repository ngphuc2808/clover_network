import NotFoundPage from '@/components/pages/NotFoundPage'
import ForgotPasswordPage from '@/components/templates/ForgotPasswordPage'
import LoadingPage from '@/components/templates/LoadingPage'
import React, { Suspense, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const HomePage = React.lazy(() => import('@/components/templates/HomePage'))
const LoginPage = React.lazy(() => import('@/components/templates/LoginPage'))
const RegisterPage = React.lazy(
  () => import('@/components/templates/RegisterPage'),
)

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
      <Suspense fallback={<LoadingPage />}>
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
          <LoadingPage />
        )}
      </Suspense>
    </div>
  )
}

export default App
