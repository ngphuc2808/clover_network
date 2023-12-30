import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { BiBell, BiMessageRounded } from 'react-icons/bi'
import { IoLogOutOutline } from 'react-icons/io5'
import { AiOutlineSetting } from 'react-icons/ai'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

import images from '@/assets/images'

import {
  useDebounce,
  useDeleteLogout,
  useGetFetchQuery,
  useGetSearchUserInfo,
  usePostConnectUser,
} from '@/hook'

import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

const MainHeader = () => {
  const router = useNavigate()

  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const lougoutApi = useDeleteLogout()

  const queryClient = useQueryClient()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640)
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const searchUserApi = useGetSearchUserInfo(debouncedSearchTerm.trim())

  const connectApi = usePostConnectUser()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  const handleLogout = async () => {
    const token = JSON.parse(localStorage.getItem('userLogin')!).tokenId

    lougoutApi.mutate(token, {
      onSuccess() {
        localStorage.removeItem('userLogin')
        router('/login')
      },
    })
  }

  const handleMoveToTop = () => {
    window.scroll(0, 0)
  }

  const handleConnect = (connected: boolean, id: string, lastName: string) => {
    console.log(connected)
    if (connected) {
      connectApi.mutate(
        {
          targetUserId: id,
          status: 0,
        },
        {
          onSuccess() {
            toast.success(`You have unfollowed ${lastName}`)
            queryClient.invalidateQueries({ queryKey: ['SearchUserInfo'] })
          },
        },
      )
    } else {
      connectApi.mutate(
        {
          targetUserId: id,
          status: 1,
        },
        {
          onSuccess() {
            toast.success(`Already follow ${lastName}`)
            queryClient.invalidateQueries({ queryKey: ['SearchUserInfo'] })
          },
        },
      )
    }
  }

  return (
    <header className='fixed left-0 right-0 top-0 z-50 flex h-[61px] items-center bg-white px-3 shadow-md sm:grid sm:grid-cols-3 sm:grid-rows-1'>
      <div className='sm:col-span-1'>
        <span
          className={`mr-3 ${
            isMobile && openSearch ? 'flex' : 'hidden'
          }  h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-primaryColor`}
          onClick={() => {
            setSearchTerm('')
            setOpenSearch(false)
          }}
        >
          <MdOutlineKeyboardBackspace />
        </span>
        <Button
          to={'/'}
          className={`mr-2 items-center gap-1 sm:mr-0 ${
            isMobile && openSearch ? 'hidden' : 'inline-flex'
          }`}
          onClick={handleMoveToTop}
        >
          <figure className='w-12'>
            <img src='../../logo.png' />
          </figure>
          <h1 className='hidden text-4xl text-primaryColor sm:block'>Clover</h1>
        </Button>
      </div>
      <div className='relative flex-1 sm:col-span-1'>
        <Search
          isMobile={isMobile}
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          title='Search Clover'
          handleClearChange={handleClearChange}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
          loading={searchUserApi.isLoading}
        />
        {searchTerm &&
          (!searchUserApi.isLoading ? (
            <ul className='absolute mt-3 w-full rounded-md bg-white px-2 shadow-md [&>:last-child]:border-none '>
              {searchUserApi.data?.data.users !== null ? (
                searchUserApi.data?.data.users.map((it) => (
                  <li
                    key={it.userId}
                    className='flex cursor-pointer items-center justify-between gap-3 border-b p-4 hover:bg-gray-100 '
                  >
                    <Button
                      to={`/profile/${it.userId}`}
                      className='flex items-center gap-3'
                    >
                      <figure className='w-10 overflow-hidden rounded-full'>
                        <img src={it.avatar || images.avatar} alt='avatar' />
                      </figure>
                      {it.firstname} {it.lastname}
                    </Button>
                    <div>
                      <Button
                        className={`flex items-center gap-2 rounded-lg  px-4 py-2 hover:opacity-80 ${
                          it.connected
                            ? 'border border-primaryColor text-primaryColor'
                            : 'bg-primaryColor  text-white'
                        }`}
                        onClick={() =>
                          handleConnect(it.connected, it.userId, it.lastname!)
                        }
                      >
                        <p>{it.connected ? 'Unfollow' : 'Follow'}</p>
                      </Button>
                    </div>
                  </li>
                ))
              ) : (
                <li className='cursor-pointer border-b p-4 hover:bg-gray-100'>
                  User not found!
                </li>
              )}
            </ul>
          ) : (
            <ul className='absolute mt-3 w-full rounded-md bg-white px-2 shadow-md [&>:last-child]:border-none '>
              <li className='cursor-pointer border-b p-4 hover:bg-gray-100'>
                Loading...
              </li>
            </ul>
          ))}
      </div>
      <div className='flex flex-none items-center justify-end gap-3 sm:col-span-1'>
        <span
          className={`${
            openSearch ? 'hidden' : 'flex'
          } h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-primaryColor sm:flex sm:h-auto sm:w-auto sm:p-3`}
        >
          <BiMessageRounded />
        </span>
        <span
          className={`${
            openSearch ? 'hidden' : 'flex'
          } h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-primaryColor sm:flex sm:h-auto sm:w-auto sm:p-3`}
        >
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
                <figure className='h-[45px] w-[45px] overflow-hidden rounded-full'>
                  <img
                    src={(getUserInfo?.data.avatar as string) || images.avatar}
                    className='h-full w-full object-cover'
                    alt='avatar'
                  />
                </figure>
                <Button
                  to={`/profile/${getUserInfo?.data.userId}`}
                  className='rounded-lg bg-primaryColor px-3 py-2 text-[12px] text-white hover:opacity-90'
                >
                  Profile
                </Button>
              </div>
              <div className='mt-2 flex w-full items-end justify-between'>
                <div>
                  <h1 className='mt-3 font-medium text-textHeadingColor'>
                    {getUserInfo?.data.firstname}&nbsp;
                    {getUserInfo?.data.lastname}
                  </h1>
                  <h2 className='mt-1 text-sm text-textPrimaryColor'>
                    @{getUserInfo?.data.lastname}
                  </h2>
                </div>
                <div className='flex gap-3 text-sm text-textPrimaryColor [&>:hover]:text-primaryColor'>
                  <Button
                    to={'/update-profile'}
                    className='cursor-pointer text-lg sm:text-2xl'
                  >
                    <AiOutlineSetting />
                  </Button>
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
          <figure className='h-[45px] w-[45px] overflow-hidden rounded-full hover:cursor-pointer sm:h-[48px] sm:w-[48px]'>
            <img
              src={(getUserInfo?.data.avatar as string) || images.avatar}
              className='h-full w-full object-cover'
              alt='avatar'
            />
          </figure>
        </Tippy>
      </div>
    </header>
  )
}

export default MainHeader
