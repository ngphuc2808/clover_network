import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Modal, Row } from 'antd'
import { useInView } from 'react-intersection-observer'
import { IoIosSettings } from 'react-icons/io'
import { MdFeed, MdGroups } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import { IoChevronDown } from 'react-icons/io5'
import { TbDoorEnter, TbDoorExit } from 'react-icons/tb'
import { toast } from 'react-toastify'
import { FcAddImage } from 'react-icons/fc'
import { BsEmojiSmile } from 'react-icons/bs'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { CiCamera } from 'react-icons/ci'

import {
  useApproveMember,
  useDebounce,
  useDisableGroup,
  useGetFetchQuery,
  useGetGroupInfo,
  useGetListAllGroup,
  useGetListFeedOfGroup,
  useGetListMemberGroup,
  useGetListMemberWaiting,
  useGetSearchInfo,
  useJoinGroup,
  useLeaveGroup,
  usePostConnectUser,
  usePostUploadBanner,
} from '@/hook'

import { listAudienceGroup } from '@/utils/data'
import images from '@/assets/images'
import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import ModalPost from '@/components/molecules/ModalPost'
import ModalAudience from '@/components/molecules/ModalAudience'
import FeedItem from '@/components/molecules/FeedItem'
import FeedCard from '@/components/molecules/FeedItem/FeedCard'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const GroupsInfoPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { id } = useParams()

  const navigate = useNavigate()

  const [isListApprove, setIsListApprove] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const getGroupInfoApi = useGetGroupInfo(id!)

  const getListFeedOfGroupApi = useGetListFeedOfGroup(
    id!,
    getGroupInfoApi.data?.data.currentUserRole === null ? false : true,
  )

  const getListMemberApi = useGetListMemberGroup(id!, 'MEMBER')

  const getListOwnerApi = useGetListMemberGroup(id!, 'OWNER')

  const [roleList, setRoleList] = useState<number>(0)

  const [modalListMember, setModalListMember] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [previewBanner, setPreviewBanner] = useState<string>('')
  const [photos, setPhotos] = useState<string[]>([])
  const [modalPost, setModalPost] = useState<boolean>(false)
  const [modalAudience, setModalAudience] = useState<boolean>(false)
  const [audienceValue, setAudienceValue] = useState<string>('PUBLIC')
  const [filePhotos, setFilePhotos] = useState<File[]>([])

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && getListFeedOfGroupApi.hasNextPage) {
      getListFeedOfGroupApi.fetchNextPage()
    }
  }, [
    inView,
    getListFeedOfGroupApi.hasNextPage,
    getListFeedOfGroupApi.fetchNextPage,
  ])

  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const getAllGroupApi = useGetListAllGroup()

  const uploadBannerApi = usePostUploadBanner()

  const deleteGroupApi = useDisableGroup()

  const connectApi = usePostConnectUser()

  const joinGroupApi = useJoinGroup()

  const leaveGroupApi = useLeaveGroup()

  const approveMemberApi = useApproveMember()

  const getListMemberWaiting = useGetListMemberWaiting(
    id!,
    getGroupInfoApi.data?.data.currentUserRole?.roleId === 'OWNER',
  )

  const fileListToArray = (fileList: FileList) => {
    const filesArray = []
    for (const file of fileList) {
      filesArray.push(file)
    }
    return filesArray
  }

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleOpenModalAudience = () => {
    setModalAudience(true)
  }
  const handleCloseModalAudience = () => {
    setModalAudience(false)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const searchApi = useGetSearchInfo(debouncedSearchTerm.trim())

  const handleChangeBanner = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      formData.append('groupId', id!)
      formData.append('bannerFile', e.target.files[0])
      uploadBannerApi.mutate(formData, {
        onSuccess(data) {
          toast.success('Change banner successful!')
          queryClient.invalidateQueries({ queryKey: ['GroupInfo'] })
          queryClient.invalidateQueries({ queryKey: ['ListAllGroup'] })
          setPreviewBanner('')
          console.log(data.data.data)
        },
      })
      setPreviewBanner(URL.createObjectURL(e.target.files[0]))
    }

    e.currentTarget.value = ''
  }

  const handleDeleteGroup = () => {
    deleteGroupApi.mutate(id!, {
      onSuccess() {
        toast.success('Successfully deleted group!')
        setOpenModalDelete(false)
        queryClient.invalidateQueries({ queryKey: ['ListAllGroup'] })
        navigate('/groups/list-groups')
      },
      onError(error) {
        console.log(error)
      },
    })
  }

  const handleJoinLeaveGroup = (id: string, role: string) => {
    if (role === 'WAITING_FOR_APPROVE' || role === 'APPROVED') {
      leaveGroupApi.mutate(id, {
        onSuccess() {
          toast.success(
            `${
              role === 'WAITING_FOR_APPROVE'
                ? 'Canceled the group successfully'
                : 'Leaved the group successfully'
            }`,
          )
          queryClient.invalidateQueries({ queryKey: ['SearchUserInfo'] })
          queryClient.invalidateQueries({ queryKey: ['GroupInfo'] })
          queryClient.invalidateQueries({ queryKey: ['ListAllGroup'] })
        },
      })
    } else {
      joinGroupApi.mutate(id, {
        onSuccess() {
          toast.success('Joined the group successfully')
          queryClient.invalidateQueries({ queryKey: ['SearchUserInfo'] })
          queryClient.invalidateQueries({ queryKey: ['GroupInfo'] })
          queryClient.invalidateQueries({ queryKey: ['ListAllGroup'] })
        },
      })
    }
  }

  const handleLeaveGroup = () => {
    if (
      getGroupInfoApi.data?.data.currentUserRole?.status === 'APPROVED' ||
      getGroupInfoApi.data?.data.currentUserRole?.status ===
        'WAITING_FOR_APPROVE'
    ) {
      leaveGroupApi.mutate(id!, {
        onSuccess() {
          toast.success(
            `${
              getGroupInfoApi.data?.data.currentUserRole?.status ===
              'WAITING_FOR_APPROVE'
                ? 'Canceled the group successfully'
                : 'Leaved the group successfully'
            }`,
          )
          queryClient.invalidateQueries({ queryKey: ['ListAllGroup'] })
          queryClient.invalidateQueries({ queryKey: ['SearchUserInfo'] })
          queryClient.invalidateQueries({ queryKey: ['GroupInfo'] })
        },
      })
    }
  }

  const handleJoinGroup = () => {
    joinGroupApi.mutate(id!, {
      onSuccess() {
        toast.success('Joined the group successfully')
        queryClient.invalidateQueries({ queryKey: ['ListAllGroup'] })
        queryClient.invalidateQueries({ queryKey: ['SearchUserInfo'] })
        queryClient.invalidateQueries({ queryKey: ['GroupInfo'] })
      },
    })
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

  const handleApprove = (userId: string) => {
    const data = {
      groupId: id!,
      userId: userId,
    }

    approveMemberApi.mutate(data, {
      onSuccess() {
        toast.success('Member approval successful')
        queryClient.invalidateQueries({ queryKey: ['GroupInfo'] })
        queryClient.invalidateQueries({ queryKey: ['ListMemberWaiting'] })
      },
    })
  }

  return (
    <Fragment>
      <Row
        className={`mt-[61px] ${
          searchApi.data?.data.groups && 'justify-between'
        }`}
        gutter={!searchApi.data?.data.groups ? 15 : 0}
      >
        <Col
          xl={6}
          lg={6}
          md={24}
          sm={24}
          xs={24}
          className='mb-4 min-h-screen bg-white shadow-md lg:mb-0'
        >
          <div className='p-2'>
            <div className='mb-2 flex items-center justify-between'>
              <h1 className='text-xl font-semibold text-textHeadingColor'>
                Groups
              </h1>
              <span className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-xl text-textHeadingColor'>
                <IoIosSettings />
              </span>
            </div>
            <Search
              title='Search groups'
              handleClearChange={handleClearChange}
              handleSearchChange={handleSearchChange}
              searchTerm={searchTerm}
              loading={searchApi.isLoading}
            />
            <ul className='mt-3'>
              <li className='cursor-pointer rounded-md p-2 text-lg hover:bg-bgPrimaryColor'>
                <Button
                  to={`/groups/feeds`}
                  className='flex items-center gap-2'
                  onClick={() => setSearchTerm('')}
                >
                  <span className='flex h-[40px] w-[40px] items-center justify-center rounded-full text-2xl'>
                    <MdFeed />
                  </span>
                  <p>Your feeds</p>
                </Button>
              </li>
              <li className='cursor-pointer rounded-md p-2 text-lg hover:bg-bgPrimaryColor'>
                <Button
                  to={`/groups/list-groups`}
                  className='flex items-center gap-2'
                  onClick={() => setSearchTerm('')}
                >
                  <span className='flex h-[40px] w-[40px] items-center justify-center rounded-full text-2xl '>
                    <MdGroups />
                  </span>
                  Your groups
                </Button>
              </li>
            </ul>
            <Button
              to='/groups/create'
              className='mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-primaryColor/20 p-2 text-lg font-semibold text-primaryColor'
            >
              <span>
                <FaPlus />
              </span>
              Create new group
            </Button>
            <div className='my-5 flex items-center'>
              <span className='h-px flex-1 bg-secondColor opacity-30'></span>
            </div>
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold text-textHeadingColor'>
                Groups you've joined
              </h1>
            </div>
            <ul className='mt-3 max-h-[800px] overflow-y-auto'>
              {getAllGroupApi.data?.data &&
                getAllGroupApi.data?.data.map((it) => (
                  <li
                    className='mt-3  cursor-pointer  rounded-md p-2 hover:bg-bgPrimaryColor'
                    key={it.groupId}
                  >
                    <Button
                      to={`/groups/${it.groupId}`}
                      className='flex items-center gap-3'
                      onClick={() => {
                        setIsListApprove(false)
                        setSearchTerm('')
                      }}
                    >
                      <figure className='h-[48px] w-[48px] overflow-hidden rounded-md'>
                        <img
                          className='h-full w-full object-cover'
                          src={it.bannerUrl || images.miniBanner}
                          alt='avtGroup'
                        />
                      </figure>
                      <div className='flex-1'>
                        <h1 className='line-clamp-2 font-semibold text-textHeadingColor'>
                          {it.groupName}
                        </h1>
                        <p className='line-clamp-2 text-textPrimaryColor'>
                          {it.groupDesc}
                        </p>
                      </div>
                      <span>
                        <IoChevronDown />
                      </span>
                    </Button>
                  </li>
                ))}
            </ul>
            <div className='my-5 flex items-center'>
              <span className='h-px flex-1 bg-secondColor opacity-30'></span>
            </div>
          </div>
        </Col>
        <Col
          xl={searchApi.data?.data.groups ? 16 : 18}
          lg={searchApi.data?.data.groups ? 16 : 18}
          md={24}
          sm={24}
          xs={24}
          className={`${searchApi.data?.data.groups && 'mb-5 px-3'}`}
        >
          {searchApi.data?.data ? (
            <div className={`${searchApi.data.data.groups ? '' : 'px-36'}`}>
              <h1 className='pt-5 text-lg font-semibold text-textHeadingColor'>
                Find groups
              </h1>
              <Row gutter={15}>
                {searchApi.data?.data.groups ? (
                  searchApi.data?.data.groups.map((it) => (
                    <Col
                      xl={8}
                      lg={12}
                      md={12}
                      sm={24}
                      xs={24}
                      key={it.group.groupId}
                    >
                      <div className='mt-4 rounded-md bg-white p-3 shadow-md'>
                        <div className='flex items-center gap-3'>
                          <figure className='h-[80px] w-[80px] overflow-hidden rounded-lg'>
                            <img
                              className='h-full w-full object-cover'
                              src={it.group.bannerUrl || images.miniBanner}
                              alt='avtGroup'
                            />
                          </figure>
                          <div className='flex-1'>
                            <h1 className='line-clamp-2 font-semibold text-textHeadingColor'>
                              {it.group.groupName}
                            </h1>
                            <p>{it.group.groupDesc}</p>
                          </div>
                        </div>
                        <div className='mt-3 flex items-center gap-2'>
                          <Button
                            to={`/groups/${it.group.groupId}`}
                            className='flex flex-1 items-center justify-center rounded-md bg-primaryColor/20 px-3 py-2 text-primaryColor hover:opacity-80'
                            onClick={() => setSearchTerm('')}
                          >
                            View group
                          </Button>
                          <Button
                            className={`mt-3 flex w-auto items-center items-center justify-center gap-2 rounded-lg px-4 py-2  hover:opacity-80 lg:mt-0 ${
                              it.currentUserRole !== null &&
                              (it.currentUserRole.status === 'APPROVED' ||
                                it.currentUserRole.status ===
                                  'WAITING_FOR_APPROVE')
                                ? 'border border-primaryColor text-primaryColor'
                                : 'bg-primaryColor  text-white'
                            }`}
                            onClick={() =>
                              handleJoinLeaveGroup(
                                it.group.groupId,
                                it.currentUserRole?.status!,
                              )
                            }
                          >
                            <p>
                              {it.currentUserRole !== null
                                ? it.currentUserRole.status === 'APPROVED'
                                  ? 'Leave'
                                  : it.currentUserRole.status ===
                                      'WAITING_FOR_APPROVE' && 'Cancel'
                                : 'Join'}
                            </p>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))
                ) : (
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <h1 className='mt-3'>No groups were found</h1>
                  </Col>
                )}
              </Row>
            </div>
          ) : (
            <div className='overflow-auto rounded-md'>
              <div className='bg-white p-4 shadow-md'>
                <div>
                  <div className='relative h-[350px] w-full overflow-hidden rounded-lg border border-gray-200'>
                    <figure className='h-full w-full '>
                      <img
                        className='h-full w-full object-cover'
                        src={
                          previewBanner ||
                          getGroupInfoApi.data?.data.group.bannerUrl ||
                          images.banner
                        }
                      />
                    </figure>
                    {getGroupInfoApi.data?.data.group.groupOwnerId ===
                      getUserInfo?.data.userId && (
                      <>
                        <label
                          htmlFor='banner'
                          className='absolute bottom-8 right-8 flex cursor-pointer items-center gap-2 rounded-md bg-gray-900/40 px-3 py-2 text-white'
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
                  <div className='mt-3 flex justify-between'>
                    <div>
                      <h1 className='text-2xl font-bold text-textHeadingColor'>
                        {getGroupInfoApi.data?.data.group.groupName}
                      </h1>
                      <span className='mt-3 flex items-center gap-4 text-lg text-textPrimaryColor'>
                        {listAudienceGroup.map(
                          (it) =>
                            it.key ===
                              getGroupInfoApi.data?.data.group.groupPrivacy && (
                              <div
                                className='flex items-center gap-2'
                                key={it.key}
                              >
                                <span className='text-lg'>
                                  <it.icon />
                                </span>
                                <h1 className='flex items-center gap-2'>
                                  {it.value}
                                </h1>
                              </div>
                            ),
                        )}
                        {getGroupInfoApi.data?.data.currentUserRole !==
                          null && (
                          <p
                            className='cursor-pointer text-textPrimaryColor'
                            onClick={() => setModalListMember(true)}
                          >
                            {getGroupInfoApi.data?.data.group.totalMember}
                            &nbsp; members
                          </p>
                        )}
                      </span>
                    </div>
                    {getGroupInfoApi.data?.data.currentUserRole !== null ? (
                      <div className='flex items-center gap-3'>
                        {getGroupInfoApi.data?.data.group.groupOwnerId !==
                          getUserInfo?.data.userId && (
                          <Button
                            className='flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-textHeadingColor hover:opacity-80'
                            onClick={handleLeaveGroup}
                          >
                            <span>
                              <TbDoorExit />
                            </span>
                            {getGroupInfoApi.data?.data.currentUserRole
                              .status === 'APPROVED'
                              ? 'Leave group'
                              : 'Wait for approval'}
                          </Button>
                        )}
                        {getGroupInfoApi.data?.data.group.groupOwnerId ===
                          getUserInfo?.data.userId && (
                          <Button
                            onClick={() => setOpenModalDelete(true)}
                            className='flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-textHeadingColor hover:border-red-500 hover:text-red-500 hover:opacity-80'
                          >
                            <span>
                              <RiDeleteBin5Line />
                            </span>
                            Delete group
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className='flex items-center gap-3'>
                        <Button
                          className='flex items-center gap-2 rounded-md bg-primaryColor px-3 py-2 text-white hover:opacity-80'
                          onClick={handleJoinGroup}
                        >
                          <span>
                            <TbDoorEnter />
                          </span>
                          Join
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className='my-3 flex items-center'>
                  <span className='h-px flex-1 bg-secondColor opacity-30'></span>
                </div>
                <ul className='flex items-center justify-start gap-5 text-lg'>
                  <li
                    className={`cursor-pointer p-3 ${
                      !isListApprove
                        ? 'border-b-2 border-primaryColor text-primaryColor'
                        : 'border-b border-transparent text-textPrimaryColor'
                    }`}
                    onClick={() => setIsListApprove(false)}
                  >
                    <h1 className='text-xl font-semibold'>Posts</h1>
                  </li>
                  {getGroupInfoApi.data?.data.currentUserRole?.roleId ===
                    'OWNER' && (
                    <li
                      className={`cursor-pointer p-3 ${
                        isListApprove
                          ? 'border-b-2 border-primaryColor text-primaryColor'
                          : 'border-b border-transparent text-textPrimaryColor'
                      }`}
                      onClick={() => setIsListApprove(true)}
                    >
                      <h1 className='text-xl font-semibold'>Join request</h1>
                    </li>
                  )}
                </ul>
              </div>
              <Row className='p-4' gutter={15}>
                {!isListApprove ? (
                  <>
                    <Col
                      xl={{
                        order: 1,
                        span: 14,
                      }}
                      lg={{
                        order: 1,
                        span: 14,
                      }}
                      md={{
                        order: 1,
                        span: 14,
                      }}
                      sm={{
                        order: 2,
                        span: 24,
                      }}
                      xs={{
                        order: 2,
                        span: 24,
                      }}
                      className='mt-2'
                    >
                      <div className='mb-4 rounded-lg border bg-white p-3'>
                        <div className='flex items-center gap-3'>
                          <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                            <img
                              src={getUserInfo?.data.avatar || images.avatar}
                              alt='avatar'
                            />
                          </figure>
                          <Button
                            className={`flex-1 ${
                              getGroupInfoApi.data?.data.currentUserRole ===
                                null ||
                              getGroupInfoApi.data?.data.currentUserRole
                                .status === 'WAITING_FOR_APPROVE'
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                            } rounded-full bg-bgPrimaryColor p-3 text-left text-sm text-textPrimaryColor hover:bg-primaryColor/10`}
                            onClick={() =>
                              getGroupInfoApi.data?.data.currentUserRole ===
                                null ||
                              getGroupInfoApi.data?.data.currentUserRole
                                .status === 'WAITING_FOR_APPROVE'
                                ? {}
                                : setModalPost(true)
                            }
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
                      {getGroupInfoApi.data?.data.currentUserRole?.status ===
                        'APPROVED' &&
                        getGroupInfoApi.data?.data.currentUserRole !== null &&
                        getListFeedOfGroupApi.data?.pages.map((data, index) =>
                          data.data ? (
                            data.data.map((it, i) =>
                              data.data.length === i + 1 ? (
                                <FeedItem
                                  key={it.feedItem.postId}
                                  innerRef={ref}
                                  data={it}
                                >
                                  <FeedCard data={it} />
                                </FeedItem>
                              ) : (
                                <FeedItem key={it.feedItem.postId} data={it}>
                                  <FeedCard data={it} />
                                </FeedItem>
                              ),
                            )
                          ) : (
                            <h1 key={index} className='mt-3 text-center'>
                              End of article
                            </h1>
                          ),
                        )}
                    </Col>
                    <Col
                      xl={{
                        order: 2,
                        span: 10,
                      }}
                      lg={{
                        order: 2,
                        span: 10,
                      }}
                      md={{
                        order: 2,
                        span: 10,
                      }}
                      sm={{
                        order: 1,
                        span: 24,
                      }}
                      xs={{
                        order: 1,
                        span: 24,
                      }}
                      className='mt-2'
                    >
                      <div className='min-h-[143px] rounded-lg border bg-white p-3'>
                        <h1 className='text-lg font-semibold text-textHeadingColor'>
                          About
                        </h1>
                        <div className='mt-3 flex items-center gap-3'>
                          {listAudienceGroup.map(
                            (it) =>
                              it.key ===
                                getGroupInfoApi.data?.data.group
                                  .groupPrivacy && (
                                <div
                                  className='flex items-center gap-2'
                                  key={it.key}
                                >
                                  <span className='text-lg'>
                                    <it.icon />
                                  </span>
                                  <h1 className='flex items-center gap-2 text-lg text-textHeadingColor'>
                                    {it.value}
                                  </h1>
                                </div>
                              ),
                          )}
                        </div>
                        <p className='mt-3 text-textPrimaryColor'>
                          {getGroupInfoApi.data?.data.group.groupDesc}
                        </p>
                      </div>
                    </Col>
                  </>
                ) : (
                  <Row gutter={15} className='w-full'>
                    {getGroupInfoApi.data?.data.currentUserRole?.roleId ===
                      'OWNER' &&
                    typeof getListMemberWaiting.data?.data !== 'string' &&
                    getListMemberWaiting.data?.data.length! > 0 ? (
                      getListMemberWaiting.data?.data.map((it) => (
                        <Col
                          xl={8}
                          lg={8}
                          md={12}
                          sm={24}
                          xs={24}
                          key={it.userId}
                        >
                          <div className='mt-4 rounded-md bg-white p-3 shadow-lg'>
                            <div className='mb-6 flex items-center gap-3'>
                              <figure className='h-[48px] w-[48px] overflow-hidden rounded-lg'>
                                <img
                                  src={it.avatarImgUrl || images.avatar}
                                  className='h-full w-full object-cover'
                                  alt='avtGroup'
                                />
                              </figure>
                              <h1 className='line-clamp-1 font-semibold text-textHeadingColor'>
                                {it.displayName}
                              </h1>
                              <p className='line-clamp-1 text-textPrimaryColor'>
                                {it.email}
                              </p>
                            </div>
                            <div className='mt-3 flex items-center gap-2'>
                              <Button
                                to={`/profile/${it.userId}`}
                                className='flex flex-1 items-center justify-center rounded-md bg-primaryColor/20 px-3 py-2 text-primaryColor hover:opacity-80'
                              >
                                View
                              </Button>
                              <Button
                                className='flex flex-1 items-center justify-center rounded-md bg-primaryColor/20 px-3 py-2 text-primaryColor hover:opacity-80'
                                onClick={() => handleApprove(it.userId)}
                              >
                                Approve
                              </Button>
                            </div>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                        <h1>The list is empty</h1>
                      </Col>
                    )}
                  </Row>
                )}
              </Row>
            </div>
          )}
        </Col>
      </Row>
      <Modal
        title='Delete group'
        open={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        footer={[
          <Button
            key='cancel'
            className='mr-3 rounded-md border px-3 py-2 text-textHeadingColor'
            onClick={() => setOpenModalDelete(false)}
          >
            Cancel
          </Button>,
          <Button
            key='submit'
            className='rounded-md border bg-primaryColor px-3 py-2 text-white hover:bg-red-500'
            onClick={handleDeleteGroup}
          >
            Submit
          </Button>,
        ]}
      >
        <p className='text-center text-textPrimaryColor'>
          Do you want to delete this group? Actions cannot be undone!
        </p>
      </Modal>
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
        title={
          <div className='flex items-center gap-2'>
            <h1
              className={`cursor-pointer ${
                roleList === 0 && 'text-primaryColor'
              }`}
              onClick={() => setRoleList(0)}
            >
              List members
            </h1>
            <h1
              className={`cursor-pointer ${
                roleList === 1 && 'text-primaryColor'
              }`}
              onClick={() => setRoleList(1)}
            >
              List owners
            </h1>
          </div>
        }
        width='70%'
        open={modalListMember}
        onCancel={() => setModalListMember(false)}
        footer={[
          <p
            className='cursor-pointer text-lg text-primaryColor'
            key='seemore'
            onClick={() => {
              if (roleList === 0 && getListMemberApi.hasNextPage) {
                getListMemberApi.fetchNextPage()
                return
              }
            }}
          >
            {roleList === 0
              ? getListMemberApi.hasNextPage
                ? 'See more'
                : 'No results were found'
              : ''}
          </p>,
        ]}
      >
        <Row gutter={15}>
          {roleList === 0
            ? getListMemberApi.data &&
              getListMemberApi.data?.pages.map(
                (data) =>
                  data.data &&
                  data.data.members?.map((it) => (
                    <Col xl={6} lg={8} md={12} sm={24} xs={24} key={it.userId}>
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
                            onClick={() => setModalListMember(false)}
                            className='flex flex-1 items-center justify-center rounded-md bg-primaryColor/20 px-3 py-2 text-primaryColor hover:opacity-80'
                          >
                            View
                          </Button>
                          {it.userId !== getUserInfo?.data.userId && (
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
                          )}
                        </div>
                      </div>
                    </Col>
                  )),
              )
            : getListOwnerApi.data &&
              getListOwnerApi.data?.pages.map(
                (data) =>
                  data.data &&
                  data.data.members.map((it) => (
                    <Col xl={6} lg={8} md={12} sm={24} xs={24} key={it.userId}>
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
                            onClick={() => setModalListMember(false)}
                            className='flex flex-1 items-center justify-center rounded-md bg-primaryColor/20 px-3 py-2 text-primaryColor hover:opacity-80'
                          >
                            View
                          </Button>
                          {it.userId !== getUserInfo?.data.userId && (
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
                          )}
                        </div>
                      </div>
                    </Col>
                  )),
              )}
        </Row>
      </Modal>
    </Fragment>
  )
}

export default GroupsInfoPage
