import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useInView } from 'react-intersection-observer'
import Tippy from '@tippyjs/react/headless'

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FcAddImage } from 'react-icons/fc'

import images from '@/assets/images'

import { useGetFetchQuery, useGetListFeed } from '@/hook'
import {
  CameraIcon,
  FriendsIcon,
  GroupFriendsIcon,
} from '@/components/atoms/Icons'

import ModalPost from '@/components/molecules/ModalPost'
import ModalAudience from '@/components/molecules/ModalAudience'
import Button from '@/components/atoms/Button'
import LoadingPage from '@/components/pages/LoadingPage'
import FeedCard from '@/components/molecules/FeedCard'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const HomePage = () => {
  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const getListFeedApi = useGetListFeed()

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && getListFeedApi.hasNextPage) {
      getListFeedApi.fetchNextPage()
    }
  }, [inView, getListFeedApi.hasNextPage, getListFeedApi.fetchNextPage])

  const [photos, setPhotos] = useState<string[]>([])
  const [modalPost, setModalPost] = useState<boolean>(false)
  const [modalAudience, setModalAudience] = useState<boolean>(false)
  const [audienceValue, setAudienceValue] = useState<string>('PUBLIC')

  const handleOpenModalAudience = () => {
    setModalAudience(true)
  }

  const handleCloseModalAudience = () => {
    setModalAudience(false)
  }

  if (getListFeedApi.isPending) {
    return <LoadingPage />
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

      const photoArr = []

      // const formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match(imageMimeType)) {
          toast.error('Vui lòng chọn đúng định dạng hình ảnh!')
          return
        } else {
          photoArr.push(URL.createObjectURL(files[i]))
          // formData.append('images', files[i])
        }
      }

      setPhotos(photoArr)
    }
  }

  return (
    <Fragment>
      <div className='my-[61px] grid grid-cols-1 grid-rows-1 bg-bgPrimaryColor px-3 lg:grid-cols-3'>
        <div className='col-span-0 mt-4 hidden lg:col-span-1 lg:block'>
          <ul>
            <li className='flex items-center gap-3'>
              <figure className='h-[35px] w-[35px] rounded-full hover:cursor-pointer'>
                <img
                  src={getUserInfo?.data.avatar || images.avatar}
                  className='rounded-full'
                  alt='avatar'
                />
              </figure>
              <p className='text-textHeadingColor'>
                {getUserInfo?.data.firstname}&nbsp;
                {getUserInfo?.data.lastname}
              </p>
            </li>
            <li className='mt-4 flex cursor-pointer items-center gap-3'>
              <Button className='flex w-full items-center gap-3' to='/groups'>
                <span className='h-[35px] w-[35px]'>
                  <GroupFriendsIcon />
                </span>
                <p className='text-textPrimaryColor'>Groups</p>
              </Button>
            </li>
            <li className='mt-4 flex cursor-pointer items-center gap-3'>
              <span className='h-[35px] w-[35px]'>
                <FriendsIcon />
              </span>
              <p className='text-textPrimaryColor'>Friends</p>
            </li>
            <li className='mt-4 flex cursor-pointer items-center gap-3'>
              <span className='h-[35px] w-[35px]'>
                <CameraIcon />
              </span>
              <p className='text-textPrimaryColor'>Feeds</p>
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
                <img crossOrigin='anonymous' src={images.avatar} alt='avatar' />
              </figure>
              <p className='text-textHeadingColor'>
                {getUserInfo?.data.firstname}&nbsp;
                {getUserInfo?.data.lastname}
              </p>
            </li>
            <li className='mt-4 flex cursor-pointer items-center gap-3'>
              <figure className='h-[35px] w-[35px] overflow-hidden rounded-lg hover:cursor-pointer'>
                <img crossOrigin='anonymous' src={images.avatar} alt='avatar' />
              </figure>
              <p className='text-textPrimaryColor'>
                UI/UX Designer Community - @Figma
              </p>
            </li>
            <li className='mt-4 flex cursor-pointer items-center gap-3'>
              <figure className='h-[35px] w-[35px] overflow-hidden rounded-lg hover:cursor-pointer'>
                <img crossOrigin='anonymous' src={images.avatar} alt='avatar' />
              </figure>
              <p className='text-textPrimaryColor'>
                UI/UX Designer Community - @Figma
              </p>
            </li>
            <li className='mt-4 flex cursor-pointer items-center gap-3'>
              <figure className='h-[35px] w-[35px] overflow-hidden rounded-lg hover:cursor-pointer'>
                <img crossOrigin='anonymous' src={images.avatar} alt='avatar' />
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
              <label
                htmlFor='uploadFilesHome'
                className='flex cursor-pointer items-center gap-2 p-3 hover:bg-primaryColor/10'
              >
                <span className='text-2xl'>
                  <FcAddImage />
                </span>
                <p className='font-medium text-textPrimaryColor'>Photo/video</p>
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

          {getListFeedApi.data?.pages.map(
            (feeds) =>
              feeds.data &&
              feeds.data.postIds.map((it, i) =>
                feeds.data.postIds.length === i + 1 ? (
                  <FeedCard key={it} innerRef={ref} feeds={feeds} it={it} />
                ) : (
                  <FeedCard key={it} feeds={feeds} it={it} />
                ),
              ),
          )}
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
                {getUserInfo?.data.firstname}&nbsp;
                {getUserInfo?.data.lastname}
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
      {modalPost && !modalAudience && (
        <ModalPost
          setPhotos={setPhotos}
          handleUploadImage={handleUploadImage}
          photos={photos}
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

export default HomePage
