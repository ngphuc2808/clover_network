import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useInView } from 'react-intersection-observer'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import Tippy from '@tippyjs/react/headless'

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FcAddImage } from 'react-icons/fc'

import images from '@/assets/images'

import {
  useGetFetchQuery,
  useGetListAllGroup,
  useGetListFeed,
  useGetListFriend,
  useGetListFriendRequest,
  useGetListRecommend,
  usePostConnectUser,
} from '@/hook'
import {
  CameraIcon,
  FriendsIcon,
  GroupFriendsIcon,
} from '@/components/atoms/Icons'

import ModalPost from '@/components/molecules/ModalPost'
import ModalAudience from '@/components/molecules/ModalAudience'
import Button from '@/components/atoms/Button'
import LoadingPage from '@/components/pages/LoadingPage'
import FeedItem from '@/components/molecules/FeedItem'
import FeedCard from '@/components/molecules/FeedItem/FeedCard'
import FeedCardUser from '@/components/molecules/FeedItem/FeedCardUser'
import FeedCardGroup from '@/components/molecules/FeedItem/FeedCardGroup'
import FeedCardAdmin from '@/components/molecules/FeedItem/FeedCardAdmin'
import { Col, Modal, Row } from 'antd'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
}

const HomePage = () => {
  const queryClient = useQueryClient()

  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const getListFeedApi = useGetListFeed()

  const getListFriendsApi = useGetListFriend()

  const getAllGroupApi = useGetListAllGroup()

  const getListFriendRequestApi = useGetListFriendRequest()

  const getListRecommendApi = useGetListRecommend()

  const connectApi = usePostConnectUser()

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && getListFeedApi.hasNextPage) {
      getListFeedApi.fetchNextPage()
    }
  }, [inView, getListFeedApi.hasNextPage, getListFeedApi.fetchNextPage])

  const [photos, setPhotos] = useState<string[]>([])

  const [filePhotos, setFilePhotos] = useState<File[]>([])

  const [modalPost, setModalPost] = useState<boolean>(false)
  const [modalAudience, setModalAudience] = useState<boolean>(false)
  const [audienceValue, setAudienceValue] = useState<string>('PUBLIC')

  const [modalListFriend, setModalListFriend] = useState(false)

  const [hideList, setHideList] = useState<boolean>(false)

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

  const handleConnect = (id: string, displayName: string) => {
    connectApi.mutate(
      {
        targetUserId: id,
        status: 1,
      },
      {
        onSuccess() {
          setModalListFriend(false)
          toast.success(`Already follow ${displayName}`)
          queryClient.invalidateQueries({ queryKey: ['ListFriends'] })
          queryClient.invalidateQueries({ queryKey: ['ListFriendRequest'] })
        },
      },
    )
  }

  return (
    <Fragment>
      <div className='my-[61px] grid grid-cols-1 grid-rows-1 bg-bgPrimaryColor px-3 lg:grid-cols-3'>
        <div className='col-span-0 mt-4 hidden lg:col-span-1 lg:block'>
          <div className='fixed'>
            <ul>
              <li className='flex items-center gap-3'>
                <figure className='h-[35px] w-[35px] overflow-hidden rounded-full hover:cursor-pointer'>
                  <img
                    src={getUserInfo?.data.avatar || images.avatar}
                    className='h-full w-full cursor-pointer'
                    alt='avatar'
                  />
                </figure>
                <p className='text-textHeadingColor'>
                  {getUserInfo?.data.firstname}&nbsp;
                  {getUserInfo?.data.lastname}
                </p>
              </li>
              <li className='mt-4 flex cursor-pointer items-center gap-3'>
                <Button
                  className='flex w-full items-center gap-3'
                  to='/groups/feeds'
                >
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
              {getAllGroupApi.data?.data &&
                getAllGroupApi.data?.data?.slice(0, 5).map((it) => (
                  <li
                    className='border-grey-500 mb-2 border-b p-2'
                    key={it.groupId}
                  >
                    <Button
                      to={`/groups/${it.groupId}`}
                      className='flex items-center gap-3'
                    >
                      <figure className='h-[35px] w-[35px] overflow-hidden rounded-lg hover:cursor-pointer'>
                        <img
                          src={it.bannerUrl || images.miniBanner}
                          alt='banner'
                          className='h-full w-full object-cover'
                        />
                      </figure>
                      <p className='text-textHeadingColor'>{it.groupName}</p>
                    </Button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='mt-4 overflow-hidden'>
            <Carousel
              responsive={responsive}
              autoPlay={true}
              swipeable={true}
              draggable={true}
              showDots={false}
              infinite={true}
              partialVisible={false}
              className='-mx-2 overflow-hidden rounded-md'
            >
              {getListRecommendApi.data?.data.userProfiles.length! > 0 &&
                getListRecommendApi.data?.data.userProfiles.map((it) => (
                  <div
                    className='mx-2 overflow-hidden rounded-md bg-white p-3 shadow-md'
                    key={it.userId}
                  >
                    <figure className='overflow-hidden rounded-md'>
                      <img
                        src={it.avatarImgUrl || images.miniBanner}
                        className='h-full w-full rounded-md object-contain'
                        alt='avatar'
                      />
                    </figure>
                    <h1 className='mt-2 line-clamp-1 text-center text-sm text-textPrimaryColor'>
                      {it.displayName}
                    </h1>
                    <Button
                      to={`/profile/${it.userId}`}
                      className='mt-3 w-full rounded-md bg-primaryColor px-3 py-2 text-center text-white'
                    >
                      View
                    </Button>
                  </div>
                ))}
            </Carousel>
          </div>
          <div className='my-4 w-full rounded-lg border bg-white p-3'>
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
            <div className='block items-center justify-center sm:flex'>
              <label
                htmlFor='uploadFilesHome'
                className='sm:justify-none flex cursor-pointer items-center justify-center gap-2 p-3 hover:bg-primaryColor/10'
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
              <div className='sm:justify-none flex cursor-pointer items-center justify-center gap-2 p-3 hover:bg-primaryColor/10'>
                <span className='text-2xl text-orange-400'>
                  <BsEmojiSmile />
                </span>
                <p className='font-medium text-textPrimaryColor'>
                  Feeling/activity
                </p>
              </div>
            </div>
          </div>
          {getListFeedApi.data?.pages.map((data, index) =>
            data.data ? (
              data.data.map((it, i) =>
                data.data.length === i + 1 ? (
                  it.groupItem.groupType === 2 ? (
                    <FeedItem key={it.feedItem.postId} data={it} innerRef={ref}>
                      <FeedCardAdmin data={it} />
                    </FeedItem>
                  ) : it.feedItem.toUserId === it.feedItem.authorId &&
                    it.feedItem.postToUserWall ? (
                    <FeedItem key={it.feedItem.postId} data={it} innerRef={ref}>
                      <FeedCard data={it} />
                    </FeedItem>
                  ) : it.feedItem.toUserId !== it.feedItem.authorId &&
                    it.feedItem.postToUserWall ? (
                    <FeedItem key={it.feedItem.postId} data={it} innerRef={ref}>
                      <FeedCardUser
                        data={it}
                        userLastName={it.groupItem.groupName}
                      />
                    </FeedItem>
                  ) : (
                    <FeedItem key={it.feedItem.postId} data={it} innerRef={ref}>
                      <FeedCardGroup data={it} />
                    </FeedItem>
                  )
                ) : it.groupItem.groupType === 2 ? (
                  <FeedItem key={it.feedItem.postId} data={it}>
                    <FeedCardAdmin data={it} />
                  </FeedItem>
                ) : it.feedItem.toUserId === it.feedItem.authorId &&
                  it.feedItem.postToUserWall ? (
                  <FeedItem key={it.feedItem.postId} data={it}>
                    <FeedCard data={it} />
                  </FeedItem>
                ) : it.feedItem.toUserId !== it.feedItem.authorId &&
                  it.feedItem.postToUserWall ? (
                  <FeedItem key={it.feedItem.postId} data={it}>
                    <FeedCardUser
                      data={it}
                      userLastName={it.groupItem.groupName}
                    />
                  </FeedItem>
                ) : (
                  <FeedItem key={it.feedItem.postId} data={it}>
                    <FeedCardGroup data={it} />
                  </FeedItem>
                ),
              )
            ) : (
              <h1 key={index} className='mt-3 text-center'>
                End of article
              </h1>
            ),
          )}
        </div>
        <div className='col-span-0 mt-4  hidden justify-end lg:col-span-1 lg:flex'>
          <div className='fixed w-1/4'>
            <div>
              <div className='flex items-center justify-between'>
                <h1 className='text-textHeadingColor'>Friend requests</h1>
                <h2
                  className='cursor-pointer text-primaryColor'
                  onClick={() => setModalListFriend(true)}
                >
                  See all
                </h2>
              </div>
              <ul className='max-h-[400px] overflow-y-auto'>
                {getListFriendRequestApi.data?.data?.userProfiles.map((it) => (
                  <li
                    key={it.userId}
                    className='mt-3 flex items-center justify-between gap-6 rounded-md bg-white p-2 md:block xl:flex'
                  >
                    <Button
                      to={`/profile/${it.userId}`}
                      className='flex flex-1 items-center gap-2'
                    >
                      <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                        <img
                          className='h-full w-full object-cover'
                          src={it.avatarImgUrl || images.avatar}
                          alt='avatar'
                        />
                      </figure>
                      <h1 className='line-clamp-1 text-textHeadingColor'>
                        {it.displayName}
                      </h1>
                    </Button>
                    <Button
                      className='mt-0 w-auto rounded-lg bg-primaryColor px-3 py-2 text-white hover:opacity-90 md:mt-3 md:w-full xl:mt-0 xl:w-auto'
                      onClick={() => handleConnect(it.userId, it.displayName)}
                    >
                      Follow back
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='my-5 flex items-center'>
              <span className='h-px flex-1 bg-secondColor opacity-30'></span>
            </div>
            <div className='flex items-center justify-between'>
              <h1 className='text-textPrimaryColor'>Status of friends</h1>
              <div className='flex items-center gap-3'>
                <h2
                  className='cursor-pointer text-primaryColor'
                  onClick={() => {
                    if (getListFriendsApi.hasNextPage) {
                      getListFriendsApi.fetchNextPage()
                      return
                    }
                  }}
                >
                  See more
                </h2>
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
                      <li
                        className='cursor-pointer rounded-md p-1 text-sm text-textPrimaryColor hover:bg-primaryColor/20'
                        onClick={() => setHideList(!hideList)}
                      >
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
            {!hideList && (
              <ul className='max mt-4 max-h-[300px] overflow-y-auto'>
                {getListFriendsApi.data?.pages.map(
                  (data) =>
                    data.data &&
                    data.data?.userProfiles.map((it) => (
                      <li
                        className='mb-2 rounded-md bg-white p-2'
                        key={it.userId}
                      >
                        <Button
                          to={`/profile/${it.userId}`}
                          className='flex w-full items-center gap-3'
                        >
                          <div className='relative'>
                            <figure className='h-[35px] w-[35px] rounded-full hover:cursor-pointer'>
                              <img
                                src={it.avatarImgUrl || images.avatar}
                                className='rounded-full'
                                alt='avatar'
                              />
                            </figure>
                            <span className='border-px absolute -right-[2px] bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-green-500'></span>
                          </div>
                          <p className='text-textHeadingColor'>
                            {it.displayName}
                          </p>
                        </Button>
                      </li>
                    )),
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
      {modalPost && (
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
      <Modal
        title='List Friends Request'
        open={modalListFriend}
        onCancel={() => setModalListFriend(false)}
        footer={null}
        style={{
          minWidth: '70%',
          maxWidth: '100%',
        }}
      >
        <Row gutter={15} className='max-h-[500px] overflow-y-auto'>
          {getListFriendRequestApi.data?.data?.userProfiles.map((it) => (
            <Col xl={6} lg={8} md={12} sm={24} xs={24} key={it.userId}>
              <div className='mt-3 rounded-md bg-white p-2 shadow-lg'>
                <Button
                  to={`/profile/${it.userId}`}
                  className='flex items-center gap-2'
                >
                  <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                    <img
                      className='h-full w-full object-cover'
                      src={it.avatarImgUrl || images.avatar}
                      alt='avatar'
                    />
                  </figure>
                  <h1 className='text-textHeadingColor'>{it.displayName}</h1>
                </Button>
                <Button
                  className='mt-0 mt-3 w-full rounded-lg bg-primaryColor px-3 py-2 text-white hover:opacity-90 md:mt-3'
                  onClick={() => handleConnect(it.userId, it.displayName)}
                >
                  Follow back
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Modal>
    </Fragment>
  )
}

export default HomePage
