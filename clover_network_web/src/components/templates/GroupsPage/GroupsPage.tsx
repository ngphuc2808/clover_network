import { Col, Row } from 'antd'
import { ChangeEvent, useState } from 'react'
import { IoIosSettings, IoIosMore } from 'react-icons/io'
import { MdFeed, MdGroups } from 'react-icons/md'
import { FaEarthAsia, FaPlus } from 'react-icons/fa6'
import { IoChevronDown } from 'react-icons/io5'
import { useGetListAllGroup } from '@/hook'
import { AiOutlineLike } from 'react-icons/ai'
import { FaRegCommentAlt } from 'react-icons/fa'
import { PiShareFat } from 'react-icons/pi'
import images from '@/assets/images'

import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import { useLocation } from 'react-router-dom'

const GroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const location = useLocation()

  const isFeeds = location.pathname.includes('feeds')

  const isListGroup = location.pathname.includes('list-groups')

  const getAllGroupApi = useGetListAllGroup()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  return (
    <Row className='mt-[61px]' justify='space-between'>
      <Col
        xl={6}
        lg={6}
        md={24}
        sm={24}
        xs={24}
        className='bg-white p-4 shadow-md'
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
          title='Search Groups'
          handleClearChange={handleClearChange}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />
        <ul className='mt-3'>
          <li
            className={`${
              isFeeds && 'bg-bgPrimaryColor'
            }  cursor-pointer rounded-md p-2 text-lg`}
          >
            <Button to='/groups/feeds' className='flex items-center gap-2'>
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
      </Col>
      {isListGroup && (
        <Col xl={16} lg={16} md={24} sm={24} xs={24} className='mb-5 px-3'>
          <h1 className='pt-5 text-lg font-semibold text-textHeadingColor'>
            All groups you've joined ({getAllGroupApi.data?.data.length})
          </h1>
          <Row gutter={15}>
            {getAllGroupApi.data?.data.map((it) => (
              <Col xl={8} lg={12} md={12} sm={24} xs={24} key={it.groupId}>
                <div className=' mt-4 rounded-md bg-white p-3 shadow-md'>
                  <div className='flex items-center gap-3'>
                    <figure className='h-[80px] w-[80px] overflow-hidden rounded-lg'>
                      <img
                        className='h-full w-full object-cover'
                        src={it.bannerImgUrl || images.miniBanner}
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
      )}
      {isFeeds && (
        <>
          <Col xl={12} lg={12} className='mb-5 px-3'>
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
          </Col>
          <Col span={2} />
        </>
      )}
    </Row>
  )
}

export default GroupsPage
