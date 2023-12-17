import { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import { useForm } from 'react-hook-form'
import { BsEmojiWink } from 'react-icons/bs'
import { TbClover } from 'react-icons/tb'
import { FaRegCommentAlt } from 'react-icons/fa'
import { PiShareFat } from 'react-icons/pi'
import { VscSend } from 'react-icons/vsc'

import CustomEmoji from '@/components/atoms/CustomEmoji'
import { listAudience } from '@/utils/data'
import images from '@/assets/images'
import { usePostComment } from '@/hook'

interface iProps {
  it: string
  feeds: ResponseListFeedType
  innerRef?: React.Ref<HTMLParagraphElement>
}

const FeedCard = ({ it, feeds, innerRef }: iProps) => {
  const [showComment, setShowComment] = useState<boolean>(false)

  const commentApi = usePostComment()

  const { register, watch, setValue, handleSubmit } = useForm<FeedCommentType>({
    defaultValues: {
      postId: it,
      authorId: feeds.data.feeds[it].authorId,
      content: '',
      level: 0,
    },
  })

  const handleEmojiClick = (emoData: string) => {
    const newText = watch('content') + emoData
    setValue('content', newText)
  }

  const handleComment = (value: FeedCommentType) => {
    commentApi.mutate(value, {
      onSuccess(data) {
        console.log(data)
      },
    })
  }

  return (
    <div
      ref={innerRef}
      className='mt-4 w-full rounded-lg border bg-white p-3'
      key={it}
    >
      <div className='flex items-center gap-3'>
        <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
          <img
            src={
              feeds.data.users[feeds.data.feeds[it].authorId].avatarImgUrl ||
              images.avatar
            }
            alt='avatar'
          />
        </figure>
        <div>
          <h1 className='text-textHeadingColor'>
            {feeds.data.users[feeds.data.feeds[it].authorId].displayName}
          </h1>
          <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
            <p>2h</p>
            <span>
              {listAudience.map(
                (val) =>
                  val.key === feeds.data.feeds[it].privacyType && (
                    <span key={val.value}>
                      <val.icon />
                    </span>
                  ),
              )}
            </span>
          </h1>
        </div>
      </div>
      <p className='mt-3 text-sm text-textPrimaryColor'>
        {feeds.data.feeds[it].content}
      </p>
      {/* <div className='mt-3 grid gap-2'>
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
  </div> */}
      <div className='my-3 flex items-center'>
        <span className='h-px w-full bg-secondColor opacity-30'></span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <span className=' text-textPrimaryColor'>
            <TbClover />
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
            <TbClover />
          </span>
          <p className='font-medium text-textPrimaryColor'>Like</p>
        </div>
        <div
          className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'
          onClick={() => setShowComment(!showComment)}
        >
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
      {showComment && (
        <>
          <div className='my-3 flex items-center'>
            <span className='h-px w-full bg-secondColor opacity-30'></span>
          </div>
          <div>
            <h1 className='mb-3 cursor-pointer text-sm text-textHeadingColor hover:text-primaryColor'>
              See more
            </h1>
            <ul className='mb-3 [&>li]:mb-3'>
              {feeds.data.comments[it]?.map((item, index) => (
                <li className='mb-3 flex items-center gap-3' key={index}>
                  <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                    <img
                      src={item.authorProfile.avatarImgUrl || images.avatar}
                      alt='avatar'
                    />
                  </figure>
                  <div>
                    <h1 className='text-sm text-textHeadingColor'>
                      {item.authorProfile.displayName}
                    </h1>
                    <p className='text-sm text-textPrimaryColor'>
                      {item.content}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex items-center gap-3'>
            <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
              <img src={images.avatar} alt='avatar' />
            </figure>
            <div className='relative w-full'>
              <input
                className='w-full flex-1 rounded-full bg-bgPrimaryColor p-3 pr-20 text-left text-sm text-textPrimaryColor outline-none hover:bg-primaryColor/10'
                placeholder='Write an answer...'
                {...register('content')}
              />
              <div className='absolute inset-y-0 end-0 z-50 flex items-center gap-3 pe-3'>
                <Tippy
                  interactive
                  trigger='click'
                  arrow={true}
                  placement={
                    window.innerWidth <= 640 ? 'bottom-start' : 'right'
                  }
                  render={(attrs) => (
                    <div {...attrs}>
                      <CustomEmoji handleEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                >
                  <span className='float-right block cursor-pointer text-xl text-primaryColor sm:text-lg'>
                    <BsEmojiWink />
                  </span>
                </Tippy>
                <button
                  className='float-right block cursor-pointer text-xl text-primaryColor sm:text-lg'
                  onClick={handleSubmit(handleComment)}
                >
                  <VscSend />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default FeedCard
