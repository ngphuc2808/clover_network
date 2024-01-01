import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'

import { FaPhoneAlt, FaUser } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { MdEmail } from 'react-icons/md'
import { FcAddImage } from 'react-icons/fc'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaCakeCandles } from 'react-icons/fa6'
import { CiCamera } from 'react-icons/ci'

import images from '@/assets/images'
import {
  useGetFetchQuery,
  useGetListFeedOfGroup,
  useGetListFollowers,
  useGetListFollowing,
  useGetUserProfile,
  usePostConnectUser,
  usePostUploadBanner,
} from '@/hook'

import ModalAudience from '@/components/molecules/ModalAudience'
import ModalPost from '@/components/molecules/ModalPost'
import Button from '@/components/atoms/Button'
import FeedCard from '@/components/molecules/FeedCard'
import LoadingPage from '@/components/pages/LoadingPage'
import { Col, Modal, Row, Tooltip } from 'antd'
import { useQueryClient } from '@tanstack/react-query'
import FeedCardUser from '@/components/molecules/FeedCardUser'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const ProfilePage = () => {
  const queryClient = useQueryClient()

  const [previewBanner, setPreviewBanner] = useState<string>('')
  const [modalPost, setModalPost] = useState<boolean>(false)
  const [modalAudience, setModalAudience] = useState<boolean>(false)
  const [audienceValue, setAudienceValue] = useState<string>('PUBLIC')
  const [photos, setPhotos] = useState<string[]>([])

  const [modalFollow, setModalFollow] = useState<number>(0)

  const [filePhotos, setFilePhotos] = useState<File[]>([])

  const { id } = useParams()

  const uploadBannerApi = usePostUploadBanner()

  const { ref, inView } = useInView()

  const getUserProfileApi = useGetUserProfile(id!)

  const getListFeedOfGroupApi = useGetListFeedOfGroup(
    getUserProfileApi.data?.data.userInfo.userWallId!,
  )

  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const getListFollowersApi = useGetListFollowers({
    userId: id!,
    page: '0',
    size: '20',
  })

  const getListFollowingApi = useGetListFollowing({
    userId: id!,
    page: '0',
    size: '20',
  })

  const connectApi = usePostConnectUser()

  const checkOwner = JSON.parse(localStorage.getItem('userLogin')!)

  useEffect(() => {
    if (inView && getListFeedOfGroupApi.hasNextPage) {
      getListFeedOfGroupApi.fetchNextPage()
    }
  }, [
    inView,
    getListFeedOfGroupApi.hasNextPage,
    getListFeedOfGroupApi.fetchNextPage,
  ])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewBanner)
    }
  }, [previewBanner])

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

  const handleChangeBanner = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      formData.append(
        'groupId',
        getUserProfileApi.data?.data.userInfo.userWallId!,
      )
      formData.append('bannerFile', e.target.files[0])
      uploadBannerApi.mutate(formData, {
        onSuccess() {
          toast.success('Change banner successful!')
        },
      })
      setPreviewBanner(URL.createObjectURL(e.target.files[0]))
    }

    e.currentTarget.value = ''
  }

  const handleConnect = () => {
    if (getUserProfileApi.data?.data.userInfo.connected) {
      connectApi.mutate(
        {
          targetUserId: getUserProfileApi.data?.data.userInfo.userId,
          status: 0,
        },
        {
          onSuccess() {
            toast.success(
              `You have unfollowed ${getUserProfileApi.data.data.userInfo.lastname}`,
            )
            queryClient.invalidateQueries({ queryKey: ['UserProfile'] })
            queryClient.invalidateQueries({ queryKey: ['ListFollowers'] })
            queryClient.invalidateQueries({ queryKey: ['ListFollowing'] })
          },
        },
      )
    } else {
      connectApi.mutate(
        {
          targetUserId: getUserProfileApi.data?.data.userInfo.userId!,
          status: 1,
        },
        {
          onSuccess() {
            toast.success(
              `Already follow ${getUserProfileApi.data?.data.userInfo.lastname}`,
            )
            queryClient.invalidateQueries({ queryKey: ['UserProfile'] })
            queryClient.invalidateQueries({ queryKey: ['ListFollowers'] })
            queryClient.invalidateQueries({ queryKey: ['ListFollowing'] })
          },
        },
      )
    }
  }

  const handleConnectInList = (
    connected: boolean,
    displayName: string,
    userId: string,
  ) => {
    if (connected) {
      connectApi.mutate(
        {
          targetUserId: userId,
          status: 0,
        },
        {
          onSuccess() {
            toast.success(`You have unfollowed ${displayName}`)
            queryClient.invalidateQueries({ queryKey: ['UserProfile'] })
            queryClient.invalidateQueries({ queryKey: ['ListFollowers'] })
            queryClient.invalidateQueries({ queryKey: ['ListFollowing'] })
          },
        },
      )
    } else {
      connectApi.mutate(
        {
          targetUserId: userId,
          status: 1,
        },
        {
          onSuccess() {
            toast.success(`Already follow ${displayName}`)
            queryClient.invalidateQueries({ queryKey: ['UserProfile'] })
            queryClient.invalidateQueries({ queryKey: ['ListFollowers'] })
            queryClient.invalidateQueries({ queryKey: ['ListFollowing'] })
          },
        },
      )
    }
  }

  if (getUserProfileApi.isLoading || getListFeedOfGroupApi.isLoading) {
    return <LoadingPage />
  }

  return (
    <Fragment>
      <section className='bg-white'>
        <div className='m-auto mt-[61px] max-w-screen-xl'>
          <div className='relative h-[480px] overflow-hidden rounded-b-xl'>
            <figure className='h-full w-full'>
              <img
                src={
                  previewBanner ||
                  getUserProfileApi.data?.data.userInfo.bannerUrl ||
                  images.banner
                }
                className='h-full w-full object-cover'
              />
            </figure>
            {checkOwner.userId ===
              getUserProfileApi.data?.data.userInfo.userId && (
              <>
                <label
                  htmlFor='banner'
                  className='absolute bottom-8 right-8 flex cursor-pointer items-center gap-2 rounded-md border border-primaryColor px-3 py-2 text-primaryColor'
                >
                  <span className='text-2xl'>
                    <CiCamera />
                  </span>
                  Change banner
                </label>
                <input
                  id='banner'
                  type='file'
                  onChange={handleChangeBanner}
                  accept='image/*'
                  hidden
                />
              </>
            )}
          </div>
          <div className='grid grid-cols-9 gap-2 px-12'>
            <div className='col-span-full h-0 lg:col-span-2 lg:h-auto'>
              <figure className='relative left-1/2 top-[-85px] h-[170px] w-[170px] -translate-x-1/2 overflow-hidden rounded-full border-[6px] border-white lg:top-[-30px] lg:h-[210px] lg:w-[210px]'>
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
                  <p
                    className='cursor-pointer text-textPrimaryColor'
                    onClick={() => setModalFollow(1)}
                  >
                    {getUserProfileApi.data?.data.totalConnector} followers
                  </p>
                  <p className='opacity-50'>•</p>
                  <p
                    className='cursor-pointer text-textPrimaryColor'
                    onClick={() => setModalFollow(2)}
                  >
                    {getUserProfileApi.data?.data.totalConnect} following
                  </p>
                </span>
                <div className=' mt-2 flex justify-center -space-x-4 lg:justify-normal rtl:space-x-reverse'>
                  {getListFollowersApi.data?.pages.map(
                    (data) =>
                      data.data &&
                      data.data.userProfiles.map(
                        (it, i) =>
                          i < 6 && (
                            <Button
                              to={`/profile/${it.userId}`}
                              key={it.userId}
                            >
                              <Tooltip title={it.displayName}>
                                <figure key={it.userId} className='h-10 w-10'>
                                  <img
                                    className=' rounded-full border-2 border-white '
                                    src={it.avatarImgUrl || images.avatar}
                                    alt='avatar'
                                  />
                                </figure>
                              </Tooltip>
                            </Button>
                          ),
                      ),
                  )}
                  {getListFollowersApi.data?.pages.map(
                    (data) =>
                      data.data &&
                      data.data.userProfiles.length >= 6 && (
                        <Button
                          className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-xs font-medium text-white hover:bg-gray-600'
                          to={'#'}
                        >
                          ...
                        </Button>
                      ),
                  )}
                </div>
              </div>
              {checkOwner.userId ===
                getUserProfileApi.data?.data.userInfo.userId && (
                <div className='mt-6 flex w-full justify-center lg:mt-0 lg:w-auto'>
                  <Button
                    to={'/update-profile'}
                    className='flex items-center gap-2 rounded-lg border-2 border-primaryColor bg-white px-4 py-2 text-primaryColor hover:bg-primaryColor/5'
                  >
                    <span className='text-2xl'>
                      <GoPencil />
                    </span>
                    <p>Edit information</p>
                  </Button>
                </div>
              )}
              {checkOwner.userId !==
                getUserProfileApi.data?.data.userInfo.userId && (
                <div className='mt-6 flex w-full justify-center lg:mt-0 lg:w-auto'>
                  <Button
                    className={`flex items-center gap-2 rounded-lg  px-4 py-2 hover:opacity-80 ${
                      getUserProfileApi.data?.data.userInfo.connected
                        ? 'border border-primaryColor text-primaryColor'
                        : 'bg-primaryColor  text-white'
                    }`}
                    onClick={handleConnect}
                  >
                    <p>
                      {getUserProfileApi.data?.data.userInfo.connected
                        ? 'Unfollow'
                        : 'Follow'}
                    </p>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className='my-3 flex items-center px-12'>
            <span className='h-px w-full bg-secondColor opacity-30'></span>
          </div>
          <ul className='flex flex-wrap items-center justify-center gap-5 py-3 text-lg'>
            <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'>
              <h1>Posts</h1>
            </li>
            <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'>
              <h1>About</h1>
            </li>
            <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'>
              <h1>Photos</h1>
            </li>
            <li
              className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'
              onClick={() => setModalFollow(1)}
            >
              <h1>Followers</h1>
            </li>
            <li
              className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor hover:border-primaryColor'
              onClick={() => setModalFollow(2)}
            >
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
                    <p className='normal-case'>
                      {getUserProfileApi?.data?.data.userInfo.gender === 'MALE'
                        ? 'Male'
                        : 'Female'}
                    </p>
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
              <div className='rounded-lg border bg-white p-3'>
                <div className='flex items-center gap-3'>
                  <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                    {checkOwner.userId !==
                    getUserProfileApi.data?.data.userInfo.userId ? (
                      <img
                        src={getUserInfo?.data.avatar || images.avatar}
                        alt='avatar'
                      />
                    ) : (
                      <img
                        src={
                          getUserProfileApi?.data?.data.userInfo.avatar ||
                          images.avatar
                        }
                        alt='avatar'
                      />
                    )}
                  </figure>
                  {checkOwner.userId !==
                  getUserProfileApi.data?.data.userInfo.userId ? (
                    <Button
                      className='flex-1 rounded-full bg-bgPrimaryColor p-3 text-left text-sm text-textPrimaryColor hover:bg-primaryColor/10'
                      onClick={() => setModalPost(true)}
                    >
                      Write something to{' '}
                      {getUserProfileApi?.data?.data.userInfo.lastname} ?
                    </Button>
                  ) : (
                    <Button
                      className='flex-1 rounded-full bg-bgPrimaryColor p-3 text-left text-sm text-textPrimaryColor hover:bg-primaryColor/10'
                      onClick={() => setModalPost(true)}
                    >
                      What's on your mind, {getUserInfo?.data.lastname} ?
                    </Button>
                  )}
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
              {getListFeedOfGroupApi.data?.pages.map((data, index) =>
                data.data ? (
                  data.data.map((it, i) =>
                    data.data.length === i + 1 ? (
                      it.feedItem.toUserId !== it.feedItem.authorId &&
                      it.feedItem.postToUserWall ? (
                        <FeedCardUser
                          key={it.feedItem.postId}
                          innerRef={ref}
                          data={it}
                          userLastName={`${getUserProfileApi.data?.data.userInfo
                            .firstname!} ${getUserProfileApi.data?.data.userInfo
                            .lastname!}`}
                        />
                      ) : (
                        <FeedCard
                          key={it.feedItem.postId}
                          innerRef={ref}
                          data={it}
                        />
                      )
                    ) : it.feedItem.toUserId !== it.feedItem.authorId &&
                      it.feedItem.postToUserWall ? (
                      <FeedCardUser
                        key={it.feedItem.postId}
                        data={it}
                        userLastName={`${getUserProfileApi.data?.data.userInfo
                          .firstname!} ${getUserProfileApi.data?.data.userInfo
                          .lastname!}`}
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
      <Modal
        title={`${
          modalFollow === 1
            ? 'List Followers'
            : modalFollow === 2 && 'List Following'
        }`}
        width='70%'
        open={modalFollow === 1 || modalFollow === 2}
        onCancel={() => setModalFollow(0)}
        footer={[
          <p
            className='cursor-pointer text-lg text-primaryColor'
            key='seemore'
            onClick={() => {
              if (
                modalFollow === 1 &&
                getListFollowersApi.data?.pages[
                  getListFollowersApi.data?.pages.length - 1
                ].data.userProfiles.length! > 0
              ) {
                console.log(getListFollowersApi.data)
                getListFollowersApi.fetchNextPage()
                return
              }
              if (
                modalFollow === 2 &&
                getListFollowingApi.data?.pages[
                  getListFollowingApi.data?.pages.length - 1
                ].data.userProfiles.length! > 0
              ) {
                console.log(getListFollowingApi.data?.pages)

                getListFollowingApi.fetchNextPage()
                return
              }
            }}
          >
            See more
          </p>,
        ]}
      >
        <Row gutter={15}>
          {modalFollow === 1
            ? getListFollowersApi.data?.pages.map((data, index) =>
                data.data ? (
                  data.data.userProfiles.map(
                    (it) =>
                      it.userId !== getUserInfo?.data.userId && (
                        <Col
                          xl={6}
                          lg={8}
                          md={12}
                          sm={24}
                          xs={24}
                          key={it.userId}
                        >
                          <div className='mt-4 rounded-md bg-white p-3 shadow-lg'>
                            <Row gutter={15} className='justify-between'>
                              <Col span={6}>
                                <figure className='h-[48px] w-[48px] overflow-hidden rounded-lg'>
                                  <img
                                    className='h-full w-full object-cover'
                                    src={it.avatarImgUrl || images.avatar}
                                    alt='avtGroup'
                                  />
                                </figure>
                              </Col>
                              <Col span={18}>
                                <h1 className='line-clamp-1 font-semibold text-textHeadingColor'>
                                  {it.displayName}
                                </h1>
                                <p className='line-clamp-1 text-textPrimaryColor'>
                                  {it.email}
                                </p>
                              </Col>
                            </Row>
                            <div className='mt-3 flex items-center gap-2'>
                              <Button
                                to={`/profile/${it.userId}`}
                                onClick={() => setModalFollow(0)}
                                className='flex flex-1 items-center justify-center rounded-md bg-primaryColor/20 px-3 py-2 text-primaryColor hover:opacity-80'
                              >
                                View
                              </Button>
                              <Button
                                onClick={() =>
                                  handleConnectInList(
                                    it.connected,
                                    it.displayName,
                                    it.userId,
                                  )
                                }
                                className={`flex max-h-[38px] flex-1 items-center justify-center rounded-md px-3 py-2 ${
                                  !it.connected
                                    ? 'bg-primaryColor/20 text-primaryColor'
                                    : 'border border-primaryColor bg-white  text-primaryColor'
                                } hover:opacity-80`}
                              >
                                {!it.connected ? 'Follow' : 'Unfollow'}
                              </Button>
                            </div>
                          </div>
                        </Col>
                      ),
                  )
                ) : (
                  <h1 key={index} className='mt-3 text-center'>
                    There are currently no followers
                  </h1>
                ),
              )
            : getListFollowingApi.data?.pages.map((data, index) =>
                data.data ? (
                  data.data.userProfiles.map(
                    (it) =>
                      it.userId !== getUserInfo?.data.userId && (
                        <Col
                          xl={6}
                          lg={8}
                          md={12}
                          sm={24}
                          xs={24}
                          key={it.userId}
                        >
                          <div className='mt-4 rounded-md bg-white p-3 shadow-lg'>
                            <Row gutter={15} className='justify-between'>
                              <Col span={6}>
                                <figure className='h-[48px] w-[48px] overflow-hidden rounded-lg'>
                                  <img
                                    className='h-full w-full object-cover'
                                    src={it.avatarImgUrl || images.avatar}
                                    alt='avtGroup'
                                  />
                                </figure>
                              </Col>
                              <Col span={18}>
                                <h1 className='line-clamp-1 font-semibold text-textHeadingColor'>
                                  {it.displayName}
                                </h1>
                                <p className='line-clamp-1 text-textPrimaryColor'>
                                  {it.email}
                                </p>
                              </Col>
                            </Row>
                            <div className='mt-3 flex items-center gap-2'>
                              <Button
                                to={`/profile/${it.userId}`}
                                onClick={() => setModalFollow(0)}
                                className='flex flex-1 items-center justify-center rounded-md bg-primaryColor/20 px-3 py-2 text-primaryColor hover:opacity-80'
                              >
                                View
                              </Button>
                              <Button
                                onClick={() =>
                                  handleConnectInList(
                                    it.connected,
                                    it.displayName,
                                    it.userId,
                                  )
                                }
                                className={`flex max-h-[38px] flex-1 items-center justify-center rounded-md px-3 py-2 ${
                                  !it.connected
                                    ? 'bg-primaryColor/20 text-primaryColor'
                                    : 'border border-primaryColor bg-white  text-primaryColor'
                                } hover:opacity-80`}
                              >
                                {!it.connected ? 'Follow' : 'Unfollow'}
                              </Button>
                            </div>
                          </div>
                        </Col>
                      ),
                  )
                ) : (
                  <h1 key={index} className='mt-3 text-center'>
                    There are currently no followers
                  </h1>
                ),
              )}
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ProfilePage
