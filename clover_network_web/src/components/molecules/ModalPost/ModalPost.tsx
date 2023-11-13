import { Fragment, useRef, useImperativeHandle } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { BsEmojiSmile, BsEmojiWink, BsFillCaretDownFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { FcAddImage } from 'react-icons/fc'
import Tippy from '@tippyjs/react/headless'

import { listAudience } from '@/utils/data'
import images from '@/assets/images'
import Button from '@/components/atoms/Button'
import useAutosizeTextArea, { useGetFetchQuery, usePostFeed } from '@/hook'

interface iProps {
  audienceValue: string
  setModalPost: (modalPost: boolean) => void
  handleOpenModalAudience: () => void
}

const ModalPost = ({
  audienceValue,
  setModalPost,
  handleOpenModalAudience,
}: iProps) => {
  const getUserInfo = useGetFetchQuery<ResponseUserType>('UserInfo')

  const postFeedApi = usePostFeed()

  const { register, watch, setValue, handleSubmit } = useForm<FeedsType>({
    defaultValues: {
      authorId: getUserInfo?.data.userId!,
      content: '',
      htmlContent: '',
      privacyGroupId: getUserInfo?.data.userWallId!,
      privacyType: audienceValue,
      toUserId: null,
      authorRoleGroup: null,
      dynamicLink: null,
      createdTime: null,
      updatedTime: null,
      lastActive: null,
      totalReaction: null,
      currentUserReact: null,
      postToUserWall: false,
      delFlag: false,
      isPin: false,
    },
  })

  const { ref, ...rest } = register('content', { required: true })

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useImperativeHandle(ref, () => textAreaRef.current)

  useAutosizeTextArea(textAreaRef.current, watch('content'))

  const handleEmojiClick = (emoData: EmojiClickData) => {
    const newText = watch('content') + emoData.emoji
    setValue('content', newText)
  }

  const handlePostFeed = (data: FeedsType) => {
    postFeedApi.mutate(data, {
      onSuccess() {
        setModalPost(false)
        setTimeout(() => {
          toast.success('Posted successfully!')
        }, 200)
      },
    })
  }

  return (
    <Fragment>
      <div className='fixed inset-0 z-50 bg-gray-500 bg-opacity-40'></div>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center transition'>
        <div className='relative z-20 max-h-full w-full max-w-[90%] sm:max-w-lg'>
          <div className='relative rounded-md bg-white shadow'>
            <div className='p-4 text-center'>
              <div className='relative mb-4 flex items-center justify-center'>
                <h3 className='mb-1 text-xl font-semibold text-textHeadingColor'>
                  Create post
                </h3>
                <span
                  className=' absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-textPrimaryColor hover:text-red-500'
                  onClick={() => setModalPost(false)}
                >
                  <AiOutlineClose />
                </span>
              </div>
              <hr />
              <div className='mt-4 flex items-center gap-3'>
                <figure className='h-[45px] w-[45px] overflow-hidden rounded-full hover:cursor-pointer'>
                  <img
                    crossOrigin='anonymous'
                    src={images.avatar}
                    alt='avatar'
                  />
                </figure>
                <div className='flex flex-col items-start'>
                  <h1 className='text-textHeadingColor'>
                    {getUserInfo?.data.firstname}&nbsp;
                    {getUserInfo?.data.lastname}
                  </h1>
                  <div
                    className='mt-1 flex cursor-pointer items-center gap-3 rounded-md bg-bgPrimaryColor px-2 py-1'
                    onClick={() => handleOpenModalAudience()}
                  >
                    {listAudience.map(
                      (it) =>
                        it.key === audienceValue && (
                          <div className='flex items-center gap-2' key={it.key}>
                            <span className='text-lg text-sm'>
                              <it.icon />
                            </span>
                            <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
                              {it.value}
                            </h1>
                          </div>
                        ),
                    )}
                    <span className='text-[12px] text-textHeadingColor'>
                      <BsFillCaretDownFill />
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <textarea
                  {...rest}
                  ref={textAreaRef}
                  className='max-h-[300px] w-full resize-none border-none text-xl outline-none'
                  placeholder={`What's on your mind, ${getUserInfo?.data.lastname}?`}
                  rows={1}
                />
                <div>
                  <Tippy
                    interactive
                    arrow={true}
                    trigger='click'
                    placement={window.innerWidth <= 640 ? 'bottom' : 'right'}
                    render={(attrs) => (
                      <div {...attrs}>
                        <EmojiPicker
                          skinTonesDisabled={true}
                          emojiStyle={EmojiStyle.TWITTER}
                          height={400}
                          width={400}
                          onEmojiClick={handleEmojiClick}
                        />
                      </div>
                    )}
                  >
                    <span className='float-right block cursor-pointer text-xl text-primaryColor sm:text-lg'>
                      <BsEmojiWink />
                    </span>
                  </Tippy>
                </div>
              </div>
              <div className='mt-4 grid max-h-[300px] grid-cols-1 gap-2 overflow-y-scroll rounded-xl border p-2'>
                <figure>
                  <img
                    className='h-auto w-full cursor-pointer rounded-lg'
                    src='https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg'
                    alt='photo'
                  />
                </figure>
                <figure>
                  <img
                    className='h-auto w-full cursor-pointer rounded-lg'
                    src='https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg'
                    alt='photo'
                  />
                </figure>
              </div>
              <div className='mt-4 flex w-full items-center justify-between rounded-lg border p-2 shadow'>
                <h1>Add to your post</h1>
                <div className='flex items-center justify-center'>
                  <div className='flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-primaryColor/10'>
                    <span className='text-2xl'>
                      <FcAddImage />
                    </span>
                  </div>
                  <div className='flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-primaryColor/10'>
                    <span className='text-2xl text-orange-400'>
                      <BsEmojiSmile />
                    </span>
                  </div>
                </div>
              </div>
              <Button
                className={`mt-4 w-full rounded-lg p-3 outline-none hover:opacity-90 ${
                  watch('content').length > 0
                    ? 'bg-primaryColor text-white'
                    : 'bg-gray-300 text-textPrimaryColor'
                }`}
                onClick={handleSubmit(handlePostFeed)}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ModalPost
