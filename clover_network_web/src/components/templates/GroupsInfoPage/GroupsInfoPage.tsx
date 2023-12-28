import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'antd'
import { useInView } from 'react-intersection-observer'
import { IoIosSettings } from 'react-icons/io'
import { MdFeed, MdGroups } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import { IoChevronDown } from 'react-icons/io5'
import { FaUserPlus } from 'react-icons/fa'
import { TbDoorExit } from 'react-icons/tb'
import { toast } from 'react-toastify'
import { FcAddImage } from 'react-icons/fc'
import { BsEmojiSmile } from 'react-icons/bs'

import {
  useGetFetchQuery,
  useGetGroupInfo,
  useGetListAllGroup,
  useGetListFeedOfGroup,
  useGetListMemberGroup,
} from '@/hook'

import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import images from '@/assets/images'
import { listAudienceGroup } from '@/utils/data'
import FeedCard from '@/components/molecules/FeedCard'
import ModalPost from '@/components/molecules/ModalPost'
import ModalAudience from '@/components/molecules/ModalAudience'

const imageMimeType = /image\/(png|jpg|jpeg)/i

const GroupsInfoPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { id } = useParams()

  const getGroupInfoApi = useGetGroupInfo(id!)

  const getListFeedOfGroupApi = useGetListFeedOfGroup(id!)

  const getListMemberApi = useGetListMemberGroup({
    groupId: id!,
    roleId: 'MEMBER',
    page: '0',
    size: '10',
  })

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

  return (
    <Fragment>
      <Row className='mt-[61px]' gutter={15}>
        <Col
          xl={6}
          lg={6}
          md={24}
          sm={24}
          xs={24}
          className='mb-4 bg-white shadow-md lg:mb-0'
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
              title='Search Groups'
              handleClearChange={handleClearChange}
              handleSearchChange={handleSearchChange}
              searchTerm={searchTerm}
            />
            <ul className='mt-3'>
              <li className='cursor-pointer rounded-md p-2 text-lg hover:bg-bgPrimaryColor'>
                <Button
                  to={`/groups/feeds`}
                  className='flex items-center gap-2'
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
              {getAllGroupApi.data?.data.map((it) => (
                <li
                  className='mt-3  cursor-pointer  rounded-md p-2 hover:bg-bgPrimaryColor'
                  key={it.groupId}
                >
                  <Button
                    to={`/groups/${it.groupId}`}
                    className='flex items-center gap-3'
                  >
                    <figure className='h-[48px] w-[48px] overflow-hidden rounded-md'>
                      <img
                        className='object-cover'
                        src={it.bannerImgUrl || images.miniBanner}
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
        <Col xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className='overflow-auto rounded-md'>
            <div className='bg-white p-4 shadow-md'>
              <div>
                <figure className='h-[350px] w-full overflow-hidden rounded-md border border-gray-200'>
                  <img
                    className='h-full w-full object-cover'
                    src={
                      getGroupInfoApi.data?.data.group.bannerUrl ||
                      images.banner
                    }
                  />
                </figure>
                <div className='mt-3 flex justify-between'>
                  <div>
                    <h1 className='text-2xl font-bold text-textHeadingColor'>
                      {getGroupInfoApi.data?.data.group.groupName}
                    </h1>
                    <span className='mt-3 flex items-center gap-4 text-lg text-textPrimaryColor'>
                      {listAudienceGroup.map(
                        (it) =>
                          it.value ===
                            getGroupInfoApi.data?.data.group.groupPrivacy && (
                            <div
                              className='flex items-center gap-2'
                              key={it.key}
                            >
                              <span className='text-lg'>
                                <it.icon />
                              </span>
                              <h1 className='flex items-center gap-2'>
                                {it.key}
                              </h1>
                            </div>
                          ),
                      )}
                      <p className='text-textPrimaryColor'>
                        {getListMemberApi.data?.data.total} member
                      </p>
                    </span>
                    <div className='mt-5 flex -space-x-4 rtl:space-x-reverse'>
                      {getListMemberApi.data?.data.members &&
                        getListMemberApi.data?.data.members
                          .slice(0, 5)
                          .map((it) => (
                            <img
                              className='h-10 w-10 rounded-full border-2 border-white'
                              src={it.avatarImgUrl || images.avatar}
                            />
                          ))}
                      {getListMemberApi.data?.data.total! > 5 && (
                        <Button
                          className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800'
                          to='#'
                        >
                          {getListMemberApi.data?.data.total! > 100
                            ? '+99'
                            : `+${getListMemberApi.data?.data.total}`}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Button className='flex items-center gap-2 rounded-md bg-primaryColor px-3 py-2 text-white hover:opacity-80'>
                      <span>
                        <FaUserPlus />
                      </span>
                      Invite
                    </Button>
                    <Button className='flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-textHeadingColor hover:opacity-80 '>
                      <span>
                        <TbDoorExit />
                      </span>
                      Leave group
                    </Button>
                  </div>
                </div>
              </div>
              <div className='my-3 flex items-center'>
                <span className='h-px flex-1 bg-secondColor opacity-30'></span>
              </div>
              <ul className='flex items-center justify-start gap-5 text-lg'>
                <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor'>
                  <h1 className='text-xl font-semibold text-textHeadingColor'>
                    Posts
                  </h1>
                </li>
                <li className='cursor-pointer border-b border-transparent p-3 text-textPrimaryColor'>
                  <h1 className='text-xl font-semibold text-textHeadingColor'>
                    About
                  </h1>
                </li>
              </ul>
            </div>
            <Row className='p-4' gutter={15}>
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
                <div className='rounded-lg border bg-white p-3'>
                  <div className='flex items-center gap-3'>
                    <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                      <img
                        src={getUserInfo?.data.avatar || images.avatar}
                        alt='avatar'
                      />
                    </figure>
                    <Button
                      className='flex-1 cursor-pointer rounded-full bg-bgPrimaryColor p-3 text-left text-sm text-textPrimaryColor hover:bg-primaryColor/10'
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
                        it.value ===
                          getGroupInfoApi.data?.data.group.groupPrivacy && (
                          <div className='flex items-center gap-2' key={it.key}>
                            <span className='text-lg'>
                              <it.icon />
                            </span>
                            <h1 className='flex items-center gap-2 text-lg text-textHeadingColor'>
                              {it.key}
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
            </Row>
          </div>
        </Col>
      </Row>
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

export default GroupsInfoPage
