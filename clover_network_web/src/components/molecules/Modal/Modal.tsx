import { Fragment, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsEmojiSmile, BsEmojiWink, BsFillCaretDownFill } from 'react-icons/bs'
import { FaEarthAsia } from 'react-icons/fa6'
import { FcAddImage } from 'react-icons/fc'
import Tippy from '@tippyjs/react/headless'

import images from '@/assets/images'
import Button from '@/components/atoms/Button'
import useAutosizeTextArea from '@/hook'

interface iProps {
  setModalPost: (modalPost: boolean) => void
}

const Modal = ({ setModalPost }: iProps) => {
  const [value, setValue] = useState<string>('')

  const handleEmojiClick = (emoji: any): void => {
    console.log(emoji)
    setValue((prev) => prev + emoji.emoji)
  }
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, value)

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value)
  }

  return (
    <Fragment>
      <div className='fixed inset-0 z-50 bg-gray-500 bg-opacity-40'></div>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center transition'>
        <div className='relative z-20 max-h-full w-full max-w-[90%] sm:max-w-lg'>
          <div className='relative rounded-md bg-white shadow'>
            <div className='p-4 text-center'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='mb-1 text-xl font-semibold text-textHeadingColor'>
                  Create post
                </h3>
                <span
                  className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-textPrimaryColor hover:text-red-500'
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
                  <h1 className='text-textHeadingColor'>Test Nguyen</h1>
                  <div className='flex cursor-pointer items-center gap-3 rounded-md bg-bgPrimaryColor px-2 py-1'>
                    <span className='text-textHeadingColor'>
                      <FaEarthAsia />
                    </span>
                    <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
                      Public
                    </h1>
                    <span className='text-[12px] text-textHeadingColor'>
                      <BsFillCaretDownFill />
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <textarea
                  className='max-h-[300px] w-full resize-none border-none text-xl outline-none'
                  placeholder={`What's on your mind, Phúc?`}
                  onChange={handleChange}
                  ref={textAreaRef}
                  rows={1}
                  value={value}
                />
                <Tippy
                  interactive
                  arrow={true}
                  trigger='click'
                  placement={window.innerWidth <= 640 ? 'bottom' : 'right'}
                  render={() => <EmojiPicker onEmojiClick={handleEmojiClick} />}
                >
                  <span className='float-right block cursor-pointer text-xl text-primaryColor sm:text-lg'>
                    <BsEmojiWink />
                  </span>
                </Tippy>
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
              <Button className='mt-4 w-full rounded-lg bg-primaryColor p-3 text-white hover:opacity-90'>
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Modal
