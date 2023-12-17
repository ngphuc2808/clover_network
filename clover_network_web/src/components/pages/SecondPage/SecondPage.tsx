import { Outlet } from 'react-router-dom'

import Footer from '@/components/organisms/Footer'
import SecondHeader from '@/components/organisms/SecondHeader'

const SecondLayout = () => {
  return (
    <section className='flex h-screen flex-col justify-between'>
      <SecondHeader />
      <Outlet />
      <Footer />
    </section>
  )
}

export default SecondLayout
