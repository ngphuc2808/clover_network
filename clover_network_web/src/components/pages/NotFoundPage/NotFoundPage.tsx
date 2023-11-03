import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-primaryColor/20'>
      <h1 className='text-9xl font-extrabold tracking-widest text-primaryColor'>
        404
      </h1>
      <div className='absolute rotate-12 rounded bg-yellow-400 px-2 text-sm text-white'>
        Không tìm thấy trang
      </div>
      <button className='mt-5'>
        <Link
          to={'/'}
          className='group relative inline-block text-sm font-medium text-primaryColor focus:outline-none focus:ring active:text-orange-500'
        >
          <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-secondColor transition-transform group-hover:translate-x-0 group-hover:translate-y-0' />
          <span className='relative block border border-current bg-white px-8 py-3'>
            Về trang chủ
          </span>
        </Link>
      </button>
    </main>
  )
}

export default NotFoundPage
