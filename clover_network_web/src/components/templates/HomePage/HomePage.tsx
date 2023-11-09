import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import {
  BiBell,
  BiDotsHorizontalRounded,
  BiMessageRounded,
} from 'react-icons/bi'
import { PiShareFat } from 'react-icons/pi'
import { FaRegCommentAlt } from 'react-icons/fa'
import { FaEarthAsia } from 'react-icons/fa6'
import { BsEmojiSmile } from 'react-icons/bs'
import { IoLogOutOutline } from 'react-icons/io5'
import { AiOutlineLike, AiOutlineSetting } from 'react-icons/ai'
import { MdKeyboardArrowDown, MdOutlineKeyboardBackspace } from 'react-icons/md'

import { useGetUserInfo } from '@/hook'
import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import images from '@/assets/images'
import LoadingPage from '../LoadingPage'
import {
  CameraIcon,
  FriendsIcon,
  GroupFriendsIcon,
} from '@/components/atoms/Icons'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { FcAddImage } from 'react-icons/fc'
import Modal from '@/components/molecules/Modal'

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

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640)
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [modalPost, setModalPost] = useState<boolean>(false)

  // const debouncedSearchTerm = useDebounce(searchTerm, 300)

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

  if (getUserInfoApi.isLoading) {
    return <LoadingPage />
  }

  return (
    <Fragment>
      <section>
        <header className='fixed left-0 right-0 top-0 z-50 flex h-[61px] items-center bg-white px-3 shadow-md sm:grid sm:grid-cols-3 sm:grid-rows-1'>
          <div className='sm:col-span-1'>
            <span
              className={`mr-3 ${
                isMobile && openSearch ? 'flex' : 'hidden'
              }  h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-primaryColor`}
              onClick={() => setOpenSearch(false)}
            >
              <MdOutlineKeyboardBackspace />
            </span>
            <Button
              to={'#'}
              className={`mr-2 items-center gap-1 sm:mr-0 ${
                isMobile && openSearch ? 'hidden' : 'flex'
              }`}
            >
              <figure className='w-12'>
                <img src='../../logo.png' />
              </figure>
              <h1 className='hidden text-4xl text-primaryColor sm:block'>
                Clover
              </h1>
            </Button>
          </div>
          <div className='flex-1 sm:col-span-1'>
            <Search
              isMobile={isMobile}
              openSearch={openSearch}
              setOpenSearch={setOpenSearch}
              title='Search Clover'
              handleClearChange={handleClearChange}
              handleSearchChange={handleSearchChange}
              searchTerm={searchTerm}
            />
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
                    <figure className='h-[45px] w-[45px]'>
                      <img
                        src={images.avatar}
                        className='rounded-full'
                        alt='avatar'
                      />
                    </figure>
                    <button className='rounded-lg bg-primaryColor px-3 py-2 text-[12px] text-white hover:opacity-90'>
                      Profile
                    </button>
                  </div>
                  <div className='mt-2 flex w-full items-end justify-between'>
                    <div>
                      <h1 className='mt-3 font-medium text-textHeadingColor'>
                        {getUserInfoApi.data?.data.firstname}&nbsp;
                        {getUserInfoApi.data?.data.lastname}
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
        <div className='mt-[61px] grid grid-cols-1 grid-rows-1 bg-bgPrimaryColor px-3 lg:grid-cols-3'>
          <div className='col-span-0 mt-4 hidden lg:col-span-1 lg:block'>
            <ul>
              <li className='flex items-center gap-3'>
                <figure className='h-[35px] w-[35px] rounded-full hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    className='rounded-full'
                    alt='avatar'
                  />
                </figure>
                <p className='text-textHeadingColor'>
                  {getUserInfoApi.data?.data.firstname}&nbsp;
                  {getUserInfoApi.data?.data.lastname}
                </p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <span className='h-[35px] w-[35px]'>
                  <GroupFriendsIcon />
                </span>
                <p className='text-textPrimaryColor'>Nhóm</p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <span className='h-[35px] w-[35px]'>
                  <FriendsIcon />
                </span>
                <p className='text-textPrimaryColor'>Tìm bạn</p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <span className='h-[35px] w-[35px]'>
                  <CameraIcon />
                </span>
                <p className='text-textPrimaryColor'>Gần đây nhất</p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <span className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-primaryColor/10 text-xl'>
                  <MdKeyboardArrowDown />
                </span>
                <p className='text-textPrimaryColor'>See more</p>
              </li>
            </ul>
            <div className='my-5 flex items-center'>
              <span className='h-px w-2/3 bg-secondColor opacity-30'></span>
            </div>
            <h1 className='text-textPrimaryColor'>Shortcuts</h1>
            <ul className='mt-4'>
              <li className='flex items-center gap-3'>
                <figure className='h-[35px] w-[35px] overflow-hidden rounded-lg hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <p className='text-textHeadingColor'>
                  {getUserInfoApi.data?.data.firstname}&nbsp;
                  {getUserInfoApi.data?.data.lastname}
                </p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <figure className='h-[35px] w-[35px] overflow-hidden rounded-lg hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <p className='text-textPrimaryColor'>
                  UI/UX Designer Community - @Figma
                </p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <figure className='h-[35px] w-[35px] overflow-hidden rounded-lg hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <p className='text-textPrimaryColor'>
                  UI/UX Designer Community - @Figma
                </p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <figure className='h-[35px] w-[35px] overflow-hidden rounded-lg hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <p className='text-textPrimaryColor'>
                  UI/UX Designer Community - @Figma
                </p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <span className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-primaryColor/10 text-xl'>
                  <MdKeyboardArrowDown />
                </span>
                <p className='text-textPrimaryColor'>See more</p>
              </li>
            </ul>
          </div>
          <div className='col-span-1'>
            <div className='mt-4 w-full rounded-lg border bg-white p-3'>
              <div className='flex items-center gap-3'>
                <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <Button
                  className='w-full rounded-full bg-bgPrimaryColor p-3 text-left text-sm text-textPrimaryColor hover:bg-primaryColor/10'
                  onClick={() => setModalPost(true)}
                >
                  What's on your mind, {getUserInfoApi.data?.data.lastname} ?
                </Button>
              </div>
              <div className='my-3 flex items-center'>
                <span className='h-px w-full bg-secondColor opacity-30'></span>
              </div>
              <div className='flex items-center justify-center'>
                <div className='flex cursor-pointer items-center gap-2 p-3 hover:bg-primaryColor/10'>
                  <span className='text-2xl'>
                    <FcAddImage />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>
                    Photo/video
                  </p>
                </div>
                <div className='flex cursor-pointer items-center gap-2 p-3 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-orange-400'>
                    <BsEmojiSmile />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>
                    Feeling/activity
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-4 w-full rounded-lg border bg-white p-3'>
              <div className='flex items-center gap-3'>
                <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <div>
                  <h1 className='text-textHeadingColor'>Test Nguyen</h1>
                  <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
                    <p>2h</p>
                    <span>
                      <FaEarthAsia />
                    </span>
                  </h1>
                </div>
              </div>
              <p className='mt-3 text-sm text-textPrimaryColor'>
                fdsffffffffffffffffffffffffffffffffffffffffffffffffffffffff
              </p>
              <div className='mt-3 grid gap-2'>
                <figure>
                  <img
                    className='h-auto w-full cursor-pointer rounded-lg'
                    src='https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg'
                    alt='photo'
                  />
                </figure>
                <div className='grid grid-cols-2 gap-2'>
                  <figure>
                    <img
                      className='h-48 w-full cursor-pointer rounded-lg object-cover'
                      src='https://camerabox.vn/uploads/news/2018_11/chup-anh-thien-nhien-theo-mua-2b.jpg'
                      alt='photo'
                    />
                  </figure>
                  <figure>
                    <img
                      className='h-48 w-full cursor-pointer rounded-lg object-cover'
                      src='https://camerabox.vn/uploads/news/2018_11/chup-anh-thien-nhien-theo-mua-2b.jpg'
                      alt='photo'
                    />
                  </figure>
                </div>
              </div>
              <div className='my-3 flex items-center'>
                <span className='h-px w-full bg-secondColor opacity-30'></span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <span className=' text-textPrimaryColor'>
                    <AiOutlineLike />
                  </span>
                  <p className='text-sm text-textPrimaryColor'>133</p>
                </div>
                <div className='flex items-center gap-2'>
                  <p className='text-sm text-textPrimaryColor'>133 comments</p>
                  <p className='text-sm text-textPrimaryColor'>9 shares</p>
                </div>
              </div>
              <div className='my-3 flex items-center'>
                <span className='h-px w-full bg-secondColor opacity-30'></span>
              </div>
              <div className='grid grid-cols-3'>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <AiOutlineLike />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Like</p>
                </div>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <FaRegCommentAlt />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Comment</p>
                </div>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <PiShareFat />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Share</p>
                </div>
              </div>
            </div>
            <div className='mt-4 w-full rounded-lg border bg-white p-3'>
              <div className='flex items-center gap-3'>
                <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <div>
                  <h1 className='text-textHeadingColor'>Test Nguyen</h1>
                  <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
                    <p>2h</p>
                    <span>
                      <FaEarthAsia />
                    </span>
                  </h1>
                </div>
              </div>
              <p className='mt-3 text-sm text-textPrimaryColor'>
                fdsffffffffffffffffffffffffffffffffffffffffffffffffffffffff
              </p>
              <div className='mt-3 grid gap-2'>
                <figure>
                  <img
                    className='h-auto max-w-full cursor-pointer rounded-lg'
                    src='https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg'
                    alt='photo'
                  />
                </figure>
                <div className='grid grid-cols-2 gap-2'>
                  <figure>
                    <img
                      className='h-48 w-96 cursor-pointer rounded-lg object-cover'
                      src='https://camerabox.vn/uploads/news/2018_11/chup-anh-thien-nhien-theo-mua-2b.jpg'
                      alt='photo'
                    />
                  </figure>
                  <figure>
                    <img
                      className='h-48 w-96 cursor-pointer rounded-lg object-cover'
                      src='https://camerabox.vn/uploads/news/2018_11/chup-anh-thien-nhien-theo-mua-2b.jpg'
                      alt='photo'
                    />
                  </figure>
                </div>
              </div>
              <div className='my-3 flex items-center'>
                <span className='h-px w-full bg-secondColor opacity-30'></span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <span className=' text-textPrimaryColor'>
                    <AiOutlineLike />
                  </span>
                  <p className='text-sm text-textPrimaryColor'>133</p>
                </div>
                <div className='flex items-center gap-2'>
                  <p className='text-sm text-textPrimaryColor'>133 comments</p>
                  <p className='text-sm text-textPrimaryColor'>9 shares</p>
                </div>
              </div>
              <div className='my-3 flex items-center'>
                <span className='h-px w-full bg-secondColor opacity-30'></span>
              </div>
              <div className='grid grid-cols-3'>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <AiOutlineLike />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Like</p>
                </div>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <FaRegCommentAlt />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Comment</p>
                </div>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <PiShareFat />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Share</p>
                </div>
              </div>
            </div>
            <div className='mt-4 w-full rounded-lg border bg-white p-3'>
              <div className='flex items-center gap-3'>
                <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <div>
                  <h1 className='text-textHeadingColor'>Test Nguyen</h1>
                  <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
                    <p>2h</p>
                    <span>
                      <FaEarthAsia />
                    </span>
                  </h1>
                </div>
              </div>
              <p className='mt-3 text-sm text-textPrimaryColor'>
                fdsffffffffffffffffffffffffffffffffffffffffffffffffffffffff
              </p>
              <div className='mt-3 grid gap-2'>
                <figure>
                  <img
                    className='h-auto max-w-full cursor-pointer rounded-lg'
                    src='https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg'
                    alt='photo'
                  />
                </figure>
                <div className='grid grid-cols-2 gap-2'>
                  <figure>
                    <img
                      className='h-48 w-96 cursor-pointer rounded-lg object-cover'
                      src='https://camerabox.vn/uploads/news/2018_11/chup-anh-thien-nhien-theo-mua-2b.jpg'
                      alt='photo'
                    />
                  </figure>
                  <figure>
                    <img
                      className='h-48 w-96 cursor-pointer rounded-lg object-cover'
                      src='https://camerabox.vn/uploads/news/2018_11/chup-anh-thien-nhien-theo-mua-2b.jpg'
                      alt='photo'
                    />
                  </figure>
                </div>
              </div>
              <div className='my-3 flex items-center'>
                <span className='h-px w-full bg-secondColor opacity-30'></span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <span className=' text-textPrimaryColor'>
                    <AiOutlineLike />
                  </span>
                  <p className='text-sm text-textPrimaryColor'>133</p>
                </div>
                <div className='flex items-center gap-2'>
                  <p className='text-sm text-textPrimaryColor'>133 comments</p>
                  <p className='text-sm text-textPrimaryColor'>9 shares</p>
                </div>
              </div>
              <div className='my-3 flex items-center'>
                <span className='h-px w-full bg-secondColor opacity-30'></span>
              </div>
              <div className='grid grid-cols-3'>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <AiOutlineLike />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Like</p>
                </div>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <FaRegCommentAlt />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Comment</p>
                </div>
                <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
                  <span className='text-2xl text-textPrimaryColor'>
                    <PiShareFat />
                  </span>
                  <p className='font-medium text-textPrimaryColor'>Share</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-0 ml-auto mt-4 hidden min-w-[60%] lg:col-span-1 lg:block'>
            <div className=''>
              <div className='flex items-center justify-between'>
                <h1 className='text-textHeadingColor'>Friend requests</h1>
                <h2 className='cursor-pointer text-primaryColor'>See all</h2>
              </div>
              <ul className='max-h-[200px] overflow-y-auto'>
                <li className='flex items-center justify-between'>
                  <div className='mt-3 flex items-center gap-2'>
                    <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                      <img
                        crossOrigin='anonymous'
                        src={images.avatar}
                        alt='avatar'
                      />
                    </figure>
                    <div>
                      <h1 className='text-textHeadingColor'>Test Nguyen</h1>
                      <h1 className='flex items-center gap-2 text-sm text-primaryColor'>
                        2h
                        <span className='block h-2.5 w-2.5 rounded-full bg-green-500'></span>
                      </h1>
                    </div>
                  </div>
                  <Button className='rounded-lg bg-primaryColor px-3 py-2 text-white hover:opacity-90'>
                    Follow back
                  </Button>
                </li>
                <li className='flex items-center justify-between'>
                  <div className='mt-3 flex items-center gap-2'>
                    <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                      <img
                        crossOrigin='anonymous'
                        src={images.avatar}
                        alt='avatar'
                      />
                    </figure>
                    <div>
                      <h1 className='text-textHeadingColor'>Test Nguyen</h1>
                      <h1 className='flex items-center gap-2 text-sm text-primaryColor'>
                        2h
                        <span className='block h-2.5 w-2.5 rounded-full bg-green-500'></span>
                      </h1>
                    </div>
                  </div>
                  <Button className='rounded-lg bg-primaryColor px-3 py-2 text-white hover:opacity-90'>
                    Follow back
                  </Button>
                </li>
              </ul>
            </div>
            <div className='my-5 flex items-center'>
              <span className='h-px flex-1 bg-secondColor opacity-30'></span>
            </div>
            <div className='flex items-center justify-between'>
              <h1 className='text-textPrimaryColor'>Status of friends</h1>
              <div className='flex items-center gap-3'>
                <span className='cursor-pointer text-xl text-primaryColor hover:opacity-80'>
                  <HiMagnifyingGlass />
                </span>
                <Tippy
                  interactive
                  arrow={true}
                  placement='bottom-end'
                  offset={[0, 10]}
                  render={(attrs) => (
                    <ul
                      className="relative gap-2 rounded-md border-solid bg-white p-2 shadow before:absolute before:right-[5px] before:top-[-16px] before:border-[8px] before:border-x-transparent before:border-b-white before:border-t-transparent before:content-['']"
                      {...attrs}
                    >
                      <li className='cursor-pointer rounded-md p-1 text-sm text-textPrimaryColor hover:bg-primaryColor/20'>
                        Hide list
                      </li>
                    </ul>
                  )}
                >
                  <span className='cursor-pointer text-xl text-primaryColor hover:opacity-80'>
                    <BiDotsHorizontalRounded />
                  </span>
                </Tippy>
              </div>
            </div>
            <ul className='mt-4'>
              <li className='flex items-center gap-3'>
                <div className='relative'>
                  <figure className='h-[35px] w-[35px] rounded-full hover:cursor-pointer'>
                    <img
                      crossOrigin='anonymous'
                      src={images.avatar}
                      className='rounded-full'
                      alt='avatar'
                    />
                  </figure>
                  <span className='border-px absolute -right-[2px] bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-green-500'></span>
                </div>
                <p className='text-textHeadingColor'>
                  {getUserInfoApi.data?.data.firstname}&nbsp;
                  {getUserInfoApi.data?.data.lastname}
                </p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <div className='relative'>
                  <figure className='h-[35px] w-[35px] rounded-full hover:cursor-pointer'>
                    <img
                      crossOrigin='anonymous'
                      src={images.avatar}
                      className='rounded-full'
                      alt='avatar'
                    />
                  </figure>
                  <span className='border-px absolute -right-[2px] bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-green-500'></span>
                </div>
                <p className='text-textPrimaryColor'>Phúc</p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <div className='relative'>
                  <figure className='h-[35px] w-[35px] rounded-full hover:cursor-pointer'>
                    <img
                      crossOrigin='anonymous'
                      src={images.avatar}
                      className='rounded-full'
                      alt='avatar'
                    />
                  </figure>
                  <span className='border-px absolute -right-[2px] bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-green-500'></span>
                </div>
                <p className='text-textPrimaryColor'>Phúc</p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <div className='relative'>
                  <figure className='h-[35px] w-[35px] rounded-full hover:cursor-pointer'>
                    <img
                      crossOrigin='anonymous'
                      src={images.avatar}
                      className='rounded-full'
                      alt='avatar'
                    />
                  </figure>
                  <span className='border-px absolute -right-[2px] bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-green-500'></span>
                </div>
                <p className='text-textPrimaryColor'>Phúc</p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <span className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-primaryColor/10 text-xl'>
                  <MdKeyboardArrowDown />
                </span>
                <p className='text-textPrimaryColor'>See more</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {modalPost && <Modal setModalPost={setModalPost} />}
    </Fragment>
  )
}

export default HomePage
