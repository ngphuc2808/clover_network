import { Fragment, useState } from 'react'

import { AiOutlineLike } from 'react-icons/ai'
import { FaPhoneAlt, FaRegCommentAlt, FaUser } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { PiShareFat } from 'react-icons/pi'
import { FaEarthAsia } from 'react-icons/fa6'
import { FcAddImage } from 'react-icons/fc'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaCakeCandles } from 'react-icons/fa6'

import images from '@/assets/images'
import { useGetFetchQuery } from '@/hook'

import ModalAudience from '@/components/molecules/ModalAudience'
import ModalPost from '@/components/molecules/ModalPost'
import Button from '@/components/atoms/Button'
import { MdEmail } from 'react-icons/md'

const ProfilePage = () => {
  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const [modalPost, setModalPost] = useState<boolean>(false)
  const [modalAudience, setModalAudience] = useState<boolean>(false)
  const [audienceValue, setAudienceValue] = useState<string>('PUBLIC')

  const handleOpenModalAudience = () => {
    setModalAudience(true)
  }

  const handleCloseModalAudience = () => {
    setModalAudience(false)
  }

  return (
    <Fragment>
      <section className='bg-white'>
        <div className='m-auto mt-[61px] max-w-screen-xl'>
          <div className='round h-[480px] rounded-b-xl bg-gradient-to-b from-gray-100 to-gray-300'></div>
          <div className='grid grid-cols-9 gap-2 px-12'>
            <div className='col-span-full h-0 lg:col-span-2 lg:h-auto'>
              <figure className='relative left-1/2 top-[-85px] h-[170px] w-[170px] -translate-x-1/2 overflow-hidden rounded-full border-[6px] border-white lg:top-[-30px] lg:h-60 lg:w-60'>
                <img
                  src={getUserInfo?.data.avatar || images.avatar}
                  className='h-full w-full object-cover'
                  alt='avatar'
                />
              </figure>
            </div>
            <div className='col-span-full mt-[100px] flex flex-col items-start justify-between lg:col-span-7 lg:mt-[50px] lg:flex-row'>
              <div className='w-full lg:w-auto'>
                <h1 className='text-center text-3xl font-bold text-textHeadingColor lg:text-left'>
                  {getUserInfo?.data.firstname} {getUserInfo?.data.lastname}
                </h1>
                <span className='mt-2 flex items-center justify-center gap-2 text-lg text-textPrimaryColor'>
                  <p>200 followers</p>
                  <p className='opacity-50'>•</p>
                  <p>300 following</p>
                </span>
                <div className=' mt-2 flex justify-center -space-x-4 lg:justify-normal rtl:space-x-reverse'>
                  <figure className='h-10 w-10'>
                    <img
                      className=' rounded-full border-2 border-white '
                      src={images.avatar}
                      alt='avatar'
                    />
                  </figure>
                  <figure className='h-10 w-10'>
                    <img
                      className=' rounded-full border-2 border-white '
                      src={images.avatar}
                      alt='avatar'
                    />
                  </figure>
                  <figure className='h-10 w-10'>
                    <img
                      className=' rounded-full border-2 border-white '
                      src={images.avatar}
                      alt='avatar'
                    />
                  </figure>
                  <Button
                    className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-xs font-medium text-white hover:bg-gray-600'
                    to={'#'}
                  >
                    ...
                  </Button>
                </div>
              </div>
              <div className='mt-6 flex w-full justify-center lg:mt-0 lg:w-auto'>
                <Button
                  to={'/update-profile'}
                  className='flex items-center gap-2 rounded-lg border-2 border-primaryColor bg-white px-5 py-4 text-primaryColor hover:bg-primaryColor/5'
                >
                  <span className='text-2xl'>
                    <GoPencil />
                  </span>
                  <p>Edit information</p>
                </Button>
              </div>
            </div>
          </div>
          <div className='my-3 flex items-center px-12'>
            <span className='h-px w-full bg-secondColor opacity-30'></span>
          </div>
          <ul className='flex items-center justify-center gap-5 py-3 text-lg'>
            <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'>
              <h1>Posts</h1>
            </li>
            <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'>
              <h1>About</h1>
            </li>
            <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'>
              <h1>Photos</h1>
            </li>
            <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'>
              <h1>Following</h1>
            </li>
          </ul>
        </div>
        <div className='w-full bg-bgPrimaryColor py-10'>
          <div className='mx-6 grid max-w-screen-xl grid-cols-9 gap-5 lg:m-auto'>
            <div className='col-span-full lg:col-span-3'>
              <div className='rounded-lg border bg-white px-8 py-3'>
                <h1 className='text-2xl font-bold text-primaryColor'>Intro</h1>
                <ul className='mt-3 text-primaryColor [&>:last-child]:border-none [&>li]:cursor-pointer [&>li]:border-b [&>li]:border-primaryColor/20'>
                  <li className='mt-2 flex items-center gap-3 py-3 hover:opacity-80'>
                    <span className='text-xl '>
                      <MdEmail />
                    </span>
                    <p>{getUserInfo?.data.email}</p>
                  </li>
                  <li className='mt-2 flex items-center gap-3 py-3 hover:opacity-80'>
                    <span className='text-xl '>
                      <FaPhoneAlt />
                    </span>
                    <p>{getUserInfo?.data.phoneNo}</p>
                  </li>
                  <li className='mt-2 flex items-center gap-3 py-3 hover:opacity-80'>
                    <span className='text-xl '>
                      <FaUser />
                    </span>
                    <p>{getUserInfo?.data.gender}</p>
                  </li>
                  <li className='mt-2 flex items-center gap-3 py-3 hover:opacity-80'>
                    <span className='text-xl '>
                      <FaCakeCandles />
                    </span>
                    <p>{getUserInfo?.data.dayOfBirth}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-span-full lg:col-span-6'>
              <div className='rounded-lg border bg-white p-3'>
                <div className='flex items-center gap-3'>
                  <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                    <img
                      src={getUserInfo?.data.avatar || images.avatar}
                      alt='avatar'
                    />
                  </figure>
                  <Button
                    className='flex-1 rounded-full bg-bgPrimaryColor p-3 text-left text-sm text-textPrimaryColor hover:bg-primaryColor/10'
                    onClick={() => setModalPost(true)}
                  >
                    What's on your mind, {getUserInfo?.data.lastname} ?
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
                    <p className='text-sm text-textPrimaryColor'>
                      133 comments
                    </p>
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
          </div>
        </div>
      </section>
      {modalPost && !modalAudience && (
        <ModalPost
          audienceValue={audienceValue}
          setModalPost={setModalPost}
          handleOpenModalAudience={handleOpenModalAudience}
        />
      )}
      {modalAudience && (
        <ModalAudience
          audienceValue={audienceValue}
          setAudienceValue={setAudienceValue}
          handleCloseModalAudience={handleCloseModalAudience}
        />
      )}
    </Fragment>
  )
}

export default ProfilePage
