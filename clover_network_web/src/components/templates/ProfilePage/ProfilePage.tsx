import { ChangeEvent, Fragment, useEffect, useState } from 'react'

import { FaPhoneAlt, FaUser } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { FcAddImage } from 'react-icons/fc'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaCakeCandles } from 'react-icons/fa6'

import images from '@/assets/images'
import {
  useGetFetchQuery,
  useGetListFeedOfGroup,
  useGetUserProfile,
} from '@/hook'

import ModalAudience from '@/components/molecules/ModalAudience'
import ModalPost from '@/components/molecules/ModalPost'
import Button from '@/components/atoms/Button'
import { MdEmail } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import FeedCard from '@/components/molecules/FeedCard'
import { toast } from 'react-toastify'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const ProfilePage = () => {
  const [modalPost, setModalPost] = useState<boolean>(false)
  const [modalAudience, setModalAudience] = useState<boolean>(false)
  const [audienceValue, setAudienceValue] = useState<string>('PUBLIC')
  const [photos, setPhotos] = useState<string[]>([])

  const [filePhotos, setFilePhotos] = useState<File[]>([])

  const { id } = useParams()

  const getUserProfileApi = useGetUserProfile(id!)

  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const { ref, inView } = useInView()

  const getListFeedOfGroupApi = useGetListFeedOfGroup(
    getUserProfileApi.data?.data.userInfo.userWallId!,
  )

  useEffect(() => {
    if (inView && getListFeedOfGroupApi.hasNextPage) {
      getListFeedOfGroupApi.fetchNextPage()
    }
  }, [
    inView,
    getListFeedOfGroupApi.hasNextPage,
    getListFeedOfGroupApi.fetchNextPage,
  ])

  const handleOpenModalAudience = () => {
    setModalAudience(true)
  }

  const handleCloseModalAudience = () => {
    setModalAudience(false)
  }

  const fileListToArray = (fileList: FileList) => {
    const filesArray = []
    for (const file of fileList) {
      filesArray.push(file)
    }
    return filesArray
  }

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget
    if (input.files?.length) {
      setModalPost(true)
      const files = fileListToArray(input.files)

      setFilePhotos(files)

      const photoArr = []

      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match(imageMimeType)) {
          toast.error('Vui lòng chọn đúng định dạng hình ảnh!')
          return
        } else {
          photoArr.push(URL.createObjectURL(files[i]))
        }
      }

      setPhotos(photoArr)
    }

    e.currentTarget.value = ''
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
                  src={
                    getUserProfileApi?.data?.data.userInfo.avatar ||
                    images.avatar
                  }
                  className='h-full w-full object-cover'
                  alt='avatar'
                />
              </figure>
            </div>
            <div className='col-span-full mt-[100px] flex flex-col items-start justify-between lg:col-span-7 lg:mt-[50px] lg:flex-row'>
              <div className='w-full lg:w-auto'>
                <h1 className='text-center text-3xl font-bold text-textHeadingColor lg:text-left'>
                  {getUserProfileApi?.data?.data.userInfo.firstname}{' '}
                  {getUserProfileApi?.data?.data.userInfo.lastname}
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
                    <p>{getUserProfileApi?.data?.data.userInfo.email}</p>
                  </li>
                  <li className='mt-2 flex items-center gap-3 py-3 hover:opacity-80'>
                    <span className='text-xl '>
                      <FaPhoneAlt />
                    </span>
                    <p>{getUserProfileApi?.data?.data.userInfo.phoneNo}</p>
                  </li>
                  <li className='mt-2 flex items-center gap-3 py-3 hover:opacity-80'>
                    <span className='text-xl '>
                      <FaUser />
                    </span>
                    <p>{getUserProfileApi?.data?.data.userInfo.gender}</p>
                  </li>
                  <li className='mt-2 flex items-center gap-3 py-3 hover:opacity-80'>
                    <span className='text-xl '>
                      <FaCakeCandles />
                    </span>
                    <p>{getUserProfileApi?.data?.data.userInfo.dayOfBirth}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-span-full lg:col-span-6'>
              {getUserProfileApi.data?.data.userInfo.userId ===
                getUserInfo?.data.userId && (
                <div className='rounded-lg border bg-white p-3'>
                  <div className='flex items-center gap-3'>
                    <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                      <img
                        src={
                          getUserProfileApi?.data?.data.userInfo.avatar ||
                          images.avatar
                        }
                        alt='avatar'
                      />
                    </figure>
                    <Button
                      className='flex-1 rounded-full bg-bgPrimaryColor p-3 text-left text-sm text-textPrimaryColor hover:bg-primaryColor/10'
                      onClick={() => setModalPost(true)}
                    >
                      What's on your mind,{' '}
                      {getUserProfileApi?.data?.data.userInfo.lastname} ?
                    </Button>
                  </div>
                  <div className='my-3 flex items-center'>
                    <span className='h-px w-full bg-secondColor opacity-30'></span>
                  </div>
                  <div className='flex items-center justify-center'>
                    <label
                      htmlFor='uploadFilesHome'
                      className='flex cursor-pointer items-center gap-2 p-3 hover:bg-primaryColor/10'
                    >
                      <span className='text-2xl'>
                        <FcAddImage />
                      </span>
                      <p className='font-medium text-textPrimaryColor'>
                        Photo/video
                      </p>
                      <input
                        id='uploadFilesHome'
                        type='file'
                        onChange={handleUploadImage}
                        accept='image/*'
                        multiple
                        hidden
                      />
                    </label>
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
              )}
              {getListFeedOfGroupApi.data?.pages.map((data, index) =>
                data.data ? (
                  data.data.map((it, i) =>
                    data.data.length === i + 1 ? (
                      <FeedCard
                        key={it.feedItem.postId}
                        innerRef={ref}
                        data={it}
                      />
                    ) : (
                      <FeedCard key={it.feedItem.postId} data={it} />
                    ),
                  )
                ) : (
                  <h1 key={index} className='mt-3 text-center'>
                    End of article
                  </h1>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      {modalPost && !modalAudience && (
        <ModalPost
          setPhotos={setPhotos}
          handleUploadImage={handleUploadImage}
          photos={photos}
          audienceValue={audienceValue}
          setModalPost={setModalPost}
          filePhotos={filePhotos}
          setFilePhotos={setFilePhotos}
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
