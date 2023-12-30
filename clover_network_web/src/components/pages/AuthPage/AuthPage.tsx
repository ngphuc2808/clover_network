import { Outlet } from 'react-router-dom'

const AuthPage = () => {
  return (
    <section className='grid grid-cols-12 text-textPrimaryColor'>
      <div className="col-span-0 hidden h-full min-h-screen bg-[url('../../banner.png')] bg-repeat lg:col-span-6 lg:block"></div>
      <Outlet />
    </section>
  )
}

export default AuthPage
