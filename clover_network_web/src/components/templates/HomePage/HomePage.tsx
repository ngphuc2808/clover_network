import { useDebounce } from '@/hook'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiMessageRounded } from 'react-icons/bi'
import { BiBell } from 'react-icons/bi'
import { IoLogOutOutline } from 'react-icons/io5'
import { AiOutlineSetting } from 'react-icons/ai'
import Tippy from '@tippyjs/react/headless'

import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import images from '@/assets/images'

const HomePage = () => {
  const router = useNavigate()

  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  useEffect(() => {
    if (!isLogin) {
      router('/login')
      return
    }
  }, [])

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
        <Button to={'/login'} className='flex items-center gap-1'>
          <figure className='w-12'>
            <img src='../../logo.png' />
          </figure>
          <h1 className='text-4xl text-primaryColor'>Clover</h1>
        </Button>
        <Search
          title='Search Clover'
          handleClearChange={handleClearChange}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />
        <div className='flex items-center gap-3'>
          <span className='block cursor-pointer rounded-full border bg-bgPrimaryColor p-3 text-2xl text-primaryColor'>
            <BiMessageRounded />
          </span>
          <span className='block cursor-pointer rounded-full border bg-bgPrimaryColor p-3 text-2xl text-primaryColor'>
            <BiBell />
          </span>
          <Tippy
            interactive
            arrow={true}
            placement='bottom-end'
            offset={[0, 10]}
            render={(attrs) => (
              <div
                className="relative w-[250px] w-max gap-2 rounded-md border-solid bg-white p-3 shadow before:absolute before:right-[18px] before:top-[-16px] before:border-[8px] before:border-x-transparent before:border-b-white before:border-t-transparent before:content-['']"
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
                      Nguyen Phuc
                    </h1>
                    <h2 className='mt-1 text-sm text-textPrimaryColor'>
                      @Phucnguyen
                    </h2>
                  </div>
                  <div className='flex gap-3 text-sm text-textPrimaryColor [&>:hover]:text-primaryColor'>
                    <span className='cursor-pointer text-2xl'>
                      <AiOutlineSetting />
                    </span>
                    <span
                      className='cursor-pointer text-2xl'
                      onClick={handleLogout}
                    >
                      <IoLogOutOutline />
                    </span>
                  </div>
                </div>
              </div>
            )}
          >
            <figure className='h-[49.79px] w-[49.79px] rounded-full hover:cursor-pointer'>
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
