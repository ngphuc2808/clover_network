import Button from '@/components/atoms/Button'
import Search from '@/components/molecules/Search'
import { Col, Row } from 'antd'
import { ChangeEvent, useState } from 'react'
import { IoIosSettings } from 'react-icons/io'
import { MdFeed, MdGroups } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import { IoChevronDown } from 'react-icons/io5'

const GroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [active, setActive] = useState<number>(0)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClearChange = () => {
    setSearchTerm('')
  }

  return (
    <Row className='mt-[61px]' justify='space-between'>
      <Col xl={6} className='bg-white p-4 shadow-md'>
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
              active === 0 && 'bg-bgPrimaryColor'
            } flex cursor-pointer items-center gap-2 rounded-md p-2 text-lg`}
            onClick={() => setActive(0)}
          >
            <span
              className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-2xl ${
                active === 0 && 'bg-primaryColor text-white'
              }`}
            >
              <MdFeed />
            </span>
            <p>Your feeds</p>
          </li>
          <li
            className={`${
              active === 1 && 'bg-bgPrimaryColor'
            } flex cursor-pointer items-center gap-2 rounded-md p-2 text-lg`}
            onClick={() => setActive(1)}
          >
            <span
              className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-2xl ${
                active === 1 && 'bg-primaryColor text-white'
              }`}
            >
              <MdGroups />
            </span>
            Your groups
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
        <ul className='mt-3'>
          <li className='flex items-center gap-3'>
            <figure className='h-[48px] w-[48px] overflow-hidden rounded-md'>
              <img
                className='object-cover'
                src='https://image.api.playstation.com/cdn/EP1004/CUSA00411_00/eXsWlP0EkcVkLPHgU4pjflmg07252yU8.png'
                alt='avtGroup'
              />
            </figure>
            <div className='flex-1'>
              <h1 className='line-clamp-2 font-semibold text-textHeadingColor'>
                GEAR LOGITECH - Chợ Gaming logitech 2nd GEAR LOGITECH - Chợ
                Gaming logitech 2nd GEAR LOGITECH - Chợ Gaming logitech 2nd
              </h1>
            </div>
            <span>
              <IoChevronDown />
            </span>
          </li>
        </ul>
      </Col>
      <Col xl={16}>A</Col>
    </Row>
  )
}

export default GroupsPage
