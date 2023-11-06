import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { BiBell, BiMessageRounded } from 'react-icons/bi'
import { IoLogOutOutline } from 'react-icons/io5'
import { AiOutlineSetting } from 'react-icons/ai'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

import { useDebounce, useGetUserInfo } from '@/hook'
import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import images from '@/assets/images'

const HomePage = () => {
  const router = useNavigate()

  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  const getUserInfoApi = useGetUserInfo()

  useEffect(() => {
    if (!isLogin) {
      router('/login')
      return
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [search, setOpenSearch] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  const handleLogout = () => {
    localStorage.removeItem('userLogin')
    router('/login')
  }

  return (
    <section>
      <header className='fixed left-0 right-0 top-0 flex h-[61px] items-center justify-between bg-white px-3 shadow-md sm:justify-between'>
        <span
          className={`mr-3 ${
            isMobile && search ? 'flex' : 'hidden'
          }  h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-primaryColor`}
          onClick={() => setOpenSearch(false)}
        >
          <MdOutlineKeyboardBackspace />
        </span>
        <Button
          to={'/login'}
          className={`mr-2 items-center gap-1 sm:mr-0 ${
            isMobile && search ? 'hidden' : 'flex'
          }`}
        >
          <figure className='w-12'>
            <img src='../../logo.png' />
          </figure>
          <h1 className='hidden text-4xl text-primaryColor sm:block'>Clover</h1>
        </Button>
        <Search
          isMobile={isMobile}
          search={search}
          setOpenSearch={setOpenSearch}
          title='Search Clover'
          handleClearChange={handleClearChange}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />
        <div className='flex flex-1 items-center justify-end gap-3 sm:flex-none sm:justify-normal'>
          <span className='flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-primaryColor sm:h-auto sm:w-auto sm:p-3'>
            <BiMessageRounded />
          </span>
          <span className='flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-primaryColor sm:h-auto sm:w-auto sm:p-3'>
            <BiBell />
          </span>
          <Tippy
            interactive
            arrow={true}
            placement='bottom-end'
            offset={[0, 10]}
            render={(attrs) => (
              <div
                className="relative w-[250px] gap-2 rounded-md border-solid bg-white p-3 shadow before:absolute before:right-[18px] before:top-[-16px] before:border-[8px] before:border-x-transparent before:border-b-white before:border-t-transparent before:content-['']"
                {...attrs}
              >
                <div className='flex w-full items-center justify-between'>
                  <figure className='h-[45px] w-[45px]'>
                    <img
                      src={images.avatar}
                      className='rounded-full'
                      alt='avatar'
                    />
                  </figure>
                  <button className='rounded-lg bg-primaryColor px-3 py-2 text-[12px] text-white'>
                    Profile
                  </button>
                </div>
                <div className='mt-2 flex w-full items-end justify-between'>
                  <div>
                    <h1 className='mt-3 font-medium text-textHeadingColor'>
                      {getUserInfoApi.data?.data.firstname +
                        ' ' +
                        getUserInfoApi.data?.data.lastname}
                    </h1>
                    <h2 className='mt-1 text-sm text-textPrimaryColor'>
                      @{getUserInfoApi.data?.data.lastname}
                    </h2>
                  </div>
                  <div className='flex gap-3 text-sm text-textPrimaryColor [&>:hover]:text-primaryColor'>
                    <span className='cursor-pointer text-lg sm:text-2xl'>
                      <AiOutlineSetting />
                    </span>
                    <span
                      className='cursor-pointer text-lg sm:text-2xl'
                      onClick={handleLogout}
                    >
                      <IoLogOutOutline />
                    </span>
                  </div>
                </div>
              </div>
            )}
          >
            <figure className='h-[45px] w-[45px] rounded-full hover:cursor-pointer sm:h-[49.79px] sm:w-[49.79px]'>
              <img
                crossOrigin='anonymous'
                src={images.avatar}
                className='rounded-full'
                alt='avatar'
              />
            </figure>
          </Tippy>
        </div>
      </header>
      <div className='h-screen bg-bgPrimaryColor'></div>
    </section>
  )
}

export default HomePage
