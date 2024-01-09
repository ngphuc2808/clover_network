import { ChangeEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useInView } from 'react-intersection-observer'
import { Col, Row } from 'antd'
import { IoIosSettings, IoIosMore } from 'react-icons/io'
import { MdFeed, MdGroups } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import { IoChevronDown } from 'react-icons/io5'

import images from '@/assets/images'
import {
  useDebounce,
  useGetListAllGroup,
  useGetListAllGroupHome,
  useGetSearchInfo,
  useJoinGroup,
  useLeaveGroup,
} from '@/hook'
import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import FeedItem from '@/components/molecules/FeedItem'
import FeedCardGroup from '@/components/molecules/FeedItem/FeedCardGroup'
import FeedCardAdmin from '@/components/molecules/FeedItem/FeedCardAdmin'

const GroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const queryClient = useQueryClient()

  const joinGroupApi = useJoinGroup()

  const leaveGroupApi = useLeaveGroup()

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const searchApi = useGetSearchInfo(debouncedSearchTerm.trim())

  const location = useLocation()

  const isFeeds = location.pathname.includes('feeds')

  const isListGroup = location.pathname.includes('list-groups')

  const getAllGroupApi = useGetListAllGroup()

  const getListAllGroupHomeApi = useGetListAllGroupHome(isFeeds)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && getListAllGroupHomeApi.hasNextPage) {
      getListAllGroupHomeApi.fetchNextPage()
    }
  }, [
    inView,
    getListAllGroupHomeApi.hasNextPage,
    getListAllGroupHomeApi.fetchNextPage,
  ])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
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

  return (
    <Row className='mt-[61px]' justify='space-between'>
      <Col
        xl={6}
        lg={6}
        md={24}
        sm={24}
        xs={24}
        className='min-h-screen bg-white p-4 shadow-md'
      >
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
          <li
            className={`${
              isFeeds && 'bg-bgPrimaryColor'
            }  cursor-pointer rounded-md p-2 text-lg`}
          >
            <Button
              to='/groups/feeds'
              className='flex items-center gap-2'
              onClick={() => setSearchTerm('')}
            >
              <span
                className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-2xl ${
                  isFeeds && 'bg-primaryColor text-white'
                }`}
              >
                <MdFeed />
              </span>
              <p>Your feeds</p>
            </Button>
          </li>
          <li
            className={`${
              isListGroup && 'bg-bgPrimaryColor'
            } cursor-pointer rounded-md p-2 text-lg`}
          >
            <Button
              to='/groups/list-groups'
              className='flex items-center gap-2'
              onClick={() => setSearchTerm('')}
            >
              <span
                className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-2xl ${
                  isListGroup && 'bg-primaryColor text-white'
                }`}
              >
                <MdGroups />
              </span>
              <p>Your groups</p>
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
                className='mt-3 cursor-pointer  rounded-md p-2 hover:bg-bgPrimaryColor'
                key={it.groupId}
              >
                <Button
                  to={`/groups/${it.groupId}`}
                  className='flex items-center gap-3'
                  onClick={() => setSearchTerm('')}
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
      </Col>

      {searchApi.data?.data ? (
        <Col xl={16} lg={16} md={24} sm={24} xs={24} className='mb-5 px-3'>
          <div className=''>
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
                    <div className=' mt-4 rounded-md bg-white p-3 shadow-md'>
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
                <h1 className='mt-3 px-2'>No groups were found</h1>
              )}
            </Row>
          </div>
        </Col>
      ) : isListGroup ? (
        <Col xl={16} lg={16} md={24} sm={24} xs={24} className='mb-5 px-3'>
          <h1 className='pt-5 text-lg font-semibold text-textHeadingColor'>
            All groups you've joined (
            {getAllGroupApi.data?.data?.length! > 0
              ? getAllGroupApi.data?.data.length
              : 0}
            )
          </h1>
          <Row gutter={15}>
            {getAllGroupApi.data?.data &&
              getAllGroupApi.data?.data.map((it) => (
                <Col xl={8} lg={12} md={12} sm={24} xs={24} key={it.groupId}>
                  <div className=' mt-4 rounded-md bg-white p-3 shadow-md'>
                    <div className='flex items-center gap-3'>
                      <figure className='h-[80px] w-[80px] overflow-hidden rounded-lg'>
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
                        <p>{it.groupDesc}</p>
                      </div>
                    </div>
                    <div className='mt-3 flex items-center gap-2'>
                      <Button
                        to={`/groups/${it.groupId}`}
                        className='flex flex-1 items-center justify-center rounded-md bg-primaryColor/20 px-3 py-2 text-primaryColor hover:opacity-80'
                      >
                        View group
                      </Button>
                      <span className='flex h-[37px] cursor-pointer items-center justify-center rounded-md bg-bgPrimaryColor px-2 hover:opacity-80'>
                        <IoIosMore />
                      </span>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Col>
      ) : (
        isFeeds && (
          <>
            <Col
              xl={12}
              lg={12}
              md={24}
              sm={24}
              xs={24}
              className='mb-5 mt-5 px-3'
            >
              {getListAllGroupHomeApi.data &&
                getListAllGroupHomeApi.data?.pages.map((data, index) =>
                  data.data ? (
                    data.data.map((it, i) =>
                      data.data.length === i + 1 ? (
                        it.groupItem.groupType === 2 ? (
                          <FeedItem
                            innerRef={ref}
                            key={it.feedItem.postId}
                            data={it}
                          >
                            <FeedCardAdmin />
                          </FeedItem>
                        ) : (
                          <FeedItem
                            key={it.feedItem.postId}
                            data={it}
                            innerRef={ref}
                          >
                            <FeedCardGroup data={it} />
                          </FeedItem>
                        )
                      ) : it.groupItem.groupType === 2 ? (
                        <FeedItem key={it.feedItem.postId} data={it}>
                          <FeedCardAdmin />
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
            </Col>
            <Col span={2} />
          </>
        )
      )}
    </Row>
  )
}

export default GroupsPage
