import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import { ConfigProvider } from 'antd'
import './styles/global.css'

import NotFoundPage from './components/pages/NotFoundPage'
import MainPage from './components/pages/MainPage'
import SecondPage from './components/pages/SecondPage'
import AuthPage from './components/pages/AuthPage'
import HomePage from './components/templates/HomePage'
import LoginPage from './components/templates/LoginPage'
import RegisterPage from './components/templates/RegisterPage'
import ForgotPasswordPage from './components/templates/ForgotPasswordPage'
import ProfilePage from './components/templates/ProfilePage'
import UpdateProfilePage from './components/templates/UpdateProfilePage'
import GroupsPage from './components/templates/GroupsPage'
import CreateGroupPage from './components/templates/CreateGroupPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const router = createBrowserRouter([
  { path: '*', element: <NotFoundPage /> },
  {
    path: '/',
    element: <MainPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'profile/:id', element: <ProfilePage /> },
      { path: 'update-profile', element: <UpdateProfilePage /> },
      { path: 'groups', element: <GroupsPage /> },
      { path: 'groups/create', element: <CreateGroupPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthPage />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/',
    element: <SecondPage />,
    children: [{ path: 'identify', element: <ForgotPasswordPage /> }],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            radioSize: 21,
            colorWhite: '#ffffff',
            colorPrimary: '#2EA043',
            colorBorder: '#2EA043',
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
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
    </ConfigProvider>
  </React.StrictMode>,
)
