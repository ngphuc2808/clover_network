import { Col, Radio, Row } from 'antd'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsEmojiSmile } from 'react-icons/bs'
import { FcAddImage } from 'react-icons/fc'
import { IoChevronBack, IoChevronDown } from 'react-icons/io5'

import { listAudienceGroup } from '@/utils/data'
import { useGetFetchQuery, usePostCreateGroup } from '@/hook'
import Button from '@/components/atoms/Button'
import images from '@/assets/images'
import { toast } from 'react-toastify'

const CreateGroupPage = () => {
  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])
  const [privacy, setPrivacy] = useState<boolean>(false)

  const createGroupApi = usePostCreateGroup()

  const { register, watch, setValue, handleSubmit } = useForm<CreateGroupType>({
    defaultValues: {
      groupName: '',
      description: '',
      groupPrivacy: 'PUBLIC',
    },
  })

  const handleCreateGroup = (value: CreateGroupType) => {
    createGroupApi.mutate(value, {
      onSuccess() {
        toast.success('Create group successfully!')
      },
    })
  }

  return (
    <Row className='mt-[61px]' justify='space-between'>
      <Col
        xl={6}
        lg={6}
        md={24}
        sm={24}
        xs={24}
        className='flex h-auto flex-col bg-white p-4 shadow-md'
      >
        <div className='mb-2 flex items-center gap-3'>
          <Button
            to='/groups/feeds'
            className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-xl text-textHeadingColor'
          >
            <IoChevronBack />
          </Button>
          <h1 className='text-xl font-semibold text-textHeadingColor'>
            Create group
          </h1>
        </div>
        <form className='mt-5'>
          <input
            {...register('groupName')}
            className='w-full rounded-md border border-gray-200 p-3 outline-none'
            placeholder='Group name'
          />
          <div
            className='mt-3 w-full rounded-md border border-gray-200 p-3 text-textPrimaryColor'
            onClick={(e: any) => {
              e.preventDefault()
            }}
          >
            <div
              className='flex cursor-pointer justify-between'
              onClick={() => setPrivacy(!privacy)}
            >
              <p>Choose privacy</p>
              <IoChevronDown />
            </div>
            {privacy && (
              <ul className='mt-4 max-h-[240px] overflow-y-scroll'>
                {listAudienceGroup.map((it) => (
                  <li
                    className={`flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200/60`}
                    onClick={() => {
                      setValue('groupPrivacy', it.value)
                    }}
                    key={it.key}
                  >
                    <span className='rounded-full bg-gray-200 p-3 text-xl'>
                      {<it.icon />}
                    </span>
                    <div className='flex-1 text-left'>
                      <h1 className='text-lg font-semibold text-textHeadingColor'>
                        {it.value}
                      </h1>
                      <p className='text-textPrimaryColor'>{it.desc}</p>
                    </div>
                    <Radio
                      value={it.key}
                      checked={watch('groupPrivacy') === it.value}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            {...register('description')}
            className='mt-3 w-full rounded-md border border-gray-200 p-3 outline-none'
            placeholder='Description'
          />
        </form>
        <div className='flex w-full flex-1 items-end'>
          <Button
            className={`w-full rounded-md p-2 text-lg font-semibold text-white ${
              watch('groupName').length > 0 ? 'bg-primaryColor' : 'bg-gray-200'
            }`}
            onClick={handleSubmit(handleCreateGroup)}
            disable={watch('groupName').length > 0 ? false : true}
          >
            Create
          </Button>
        </div>
      </Col>
      <Col
        xl={16}
        lg={16}
        md={24}
        sm={24}
        xs={24}
        className='mr-[61px] py-[40px]'
      >
        <div className='h-[805px] overflow-auto rounded-md shadow-md'>
          <div className='bg-white p-4 shadow-md'>
            <h1 className='mb-3 text-lg font-semibold text-textHeadingColor'>
              Preview
            </h1>
            <div>
              <figure className='h-[350px] w-full overflow-hidden rounded-md border border-gray-200'>
                <img
                  className='h-full w-full object-cover'
                  src='https://img.freepik.com/premium-vector/shamrock-garland-st-patrick-day-string-green-shamrocks-decorative-spring-vector-illustration_642540-542.jpg'
                />
              </figure>
              <div className='mt-3'>
                <h1 className='text-2xl font-bold text-textHeadingColor'>
                  {watch('groupName') || 'Group name'}
                </h1>
                <span className='mt-3 text-lg text-textPrimaryColor'>
                  {listAudienceGroup.map(
                    (it) =>
                      it.value === watch('groupPrivacy') && (
                        <div className='flex items-center gap-2' key={it.key}>
                          <span className='text-lg'>
                            <it.icon />
                          </span>
                          <h1 className='flex items-center gap-2'>{it.key}</h1>
                        </div>
                      ),
                  )}
                </span>
              </div>
            </div>
            <div className='my-3 flex items-center'>
              <span className='h-px flex-1 bg-secondColor opacity-30'></span>
            </div>
            <ul className='flex items-center justify-start gap-5 text-lg'>
              <li className='cursor-not-allowed border-b border-transparent p-3 text-textPrimaryColor'>
                <h1 className='text-xl font-semibold text-textHeadingColor'>
                  Posts
                </h1>
              </li>
              <li className='cursor-not-allowed border-b border-transparent p-3 text-textPrimaryColor'>
                <h1 className='text-xl font-semibold text-textHeadingColor'>
                  About
                </h1>
              </li>
            </ul>
          </div>
          <Row className='p-4' gutter={15}>
            <Col xl={14} lg={12} md={12} sm={24} xs={24} className='mt-2'>
              <div className='rounded-lg border bg-white p-3'>
                <div className='flex items-center gap-3'>
                  <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-not-allowed'>
                    <img
                      src={getUserInfo?.data.avatar || images.avatar}
                      alt='avatar'
                    />
                  </figure>
                  <Button
                    className='flex-1 cursor-not-allowed rounded-full bg-bgPrimaryColor p-3 text-left text-sm text-textPrimaryColor hover:bg-primaryColor/10'
                    disable
                  >
                    What's on your mind, {getUserInfo?.data.lastname} ?
                  </Button>
                </div>
                <div className='my-3 flex items-center'>
                  <span className='h-px w-full bg-secondColor opacity-30'></span>
                </div>
                <div className='flex items-center justify-center'>
                  <div className='flex cursor-not-allowed items-center gap-2 p-3 hover:bg-primaryColor/10'>
                    <span className='text-2xl'>
                      <FcAddImage />
                    </span>
                    <p className='font-medium text-textPrimaryColor'>
                      Photo/video
                    </p>
                  </div>
                  <div className='flex cursor-not-allowed items-center gap-2 p-3 hover:bg-primaryColor/10'>
                    <span className='text-2xl text-orange-400'>
                      <BsEmojiSmile />
                    </span>
                    <p className='font-medium text-textPrimaryColor'>
                      Feeling/activity
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={10} lg={12} md={12} sm={24} xs={24} className='mt-2'>
              <div className='min-h-[143px] rounded-lg border bg-white p-3'>
                <h1 className='text-lg font-semibold text-textHeadingColor'>
                  About
                </h1>
                <div className='mt-3 flex items-center gap-3'>
                  {listAudienceGroup.map(
                    (it) =>
                      it.value === watch('groupPrivacy') && (
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
                  {watch('description') || 'Description'}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  )
}

export default CreateGroupPage
