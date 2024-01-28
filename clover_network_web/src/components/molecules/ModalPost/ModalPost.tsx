import { Fragment, useRef, useImperativeHandle, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Tippy from '@tippyjs/react/headless'
import { BsEmojiSmile, BsEmojiWink, BsFillCaretDownFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { FcAddImage } from 'react-icons/fc'

import { listAudience } from '@/utils/data'
import images from '@/assets/images'
import {
  useAutosizeTextArea,
  useGetFetchQuery,
  useGetGroupInfo,
  useGetUserProfile,
  usePostFeed,
} from '@/hook'

import CustomEmoji from '@/components/atoms/CustomEmoji'
import Button from '@/components/atoms/Button'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

interface iProps {
  photos?: string[]
  setPhotos?: (photos: string[]) => void
  handleUploadImage?: (e: ChangeEvent<HTMLInputElement>) => void
  audienceValue: string
  setModalPost: (modalPost: boolean) => void
  filePhotos?: File[]
  setFilePhotos?: (file: File[]) => void
  handleOpenModalAudience: () => void
}

const ModalPost = ({
  photos,
  setPhotos,
  handleUploadImage,
  audienceValue,
  setModalPost,
  filePhotos,
  setFilePhotos,
  handleOpenModalAudience,
}: iProps) => {
  const queryClient = useQueryClient()

  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const { id } = useParams()

  const postFeedApi = usePostFeed()

  const getGroupInfoApi = useGetGroupInfo(id!)

  const getUserProfileApi = useGetUserProfile(id!)

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedsType>({
    defaultValues: {
      authorId: getUserInfo?.data.userId!,
      content: '',
      htmlContent: '',
      privacyGroupId: id
        ? typeof getGroupInfoApi.data?.data === 'object'
          ? id
          : getUserProfileApi.data?.data?.userInfo.userWallId
        : getUserInfo?.data.userWallId,
      toUserId:
        id &&
        id !== getUserInfo?.data.userId &&
        typeof getGroupInfoApi.data?.data !== 'object'
          ? id
          : '',
      privacyType: audienceValue,
      postToUserWall: id && id !== getUserInfo?.data.userId ? true : false,
    },
  })

  const { ref, ...rest } = register('content', {
    required: {
      value: true,
      message: 'Please enter content!',
    },
  })

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useImperativeHandle(ref, () => textAreaRef.current)

  useAutosizeTextArea(textAreaRef.current, watch('content'))

  const handleEmojiClick = (emoData: string) => {
    const newText = watch('content') + emoData
    setValue('content', newText)
  }

  const handlePostFeed = (data: FeedsType) => {
    data.privacyType = audienceValue
    const jsonData = JSON.stringify(data)
    const blobData = new Blob([jsonData], {
      type: 'application/json',
    })

    const formData = new FormData()
    formData.append('feedItem', blobData)

    if (filePhotos) {
      for (let i = 0; i < filePhotos.length; i++) {
        formData.append('images', filePhotos[i])
      }
    }

    postFeedApi.mutate(formData, {
      onSuccess(data) {
        setPhotos && setPhotos([])
        setModalPost(false)
        setTimeout(() => {
          if (data.data.messageEN === 'Input invalid') {
            toast.error('Posted error!')
          } else {
            toast.success('Posted successfully!')
          }
          queryClient.invalidateQueries({ queryKey: ['UserInfo'] })
          queryClient.invalidateQueries({ queryKey: ['ListFeed'] })
          queryClient.invalidateQueries({ queryKey: ['ListFeedOfGroup'] })
        }, 200)
      },
    })
  }

  const handleDeletePhoto = (item: string, index: number) => {
    if (setPhotos && photos) {
      URL.revokeObjectURL(item)
      const newPhotos = photos.filter((it) => it !== item)
      setPhotos(newPhotos)
    }

    const newFiles = filePhotos?.filter((_, i) => i !== index)
    setFilePhotos && setFilePhotos(newFiles!)
  }

  return (
    <Fragment>
      <div className='fixed inset-0 z-50 bg-gray-500 bg-opacity-40'></div>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-50 z-[9999] flex items-center justify-center transition'>
        <div className='relative z-20 max-h-full w-full max-w-[90%] sm:max-w-lg'>
          <div className='relative rounded-md bg-white shadow'>
            <div className='p-4 text-center'>
              <div className='relative mb-4 flex items-center justify-center'>
                <h3 className='mb-1 text-xl font-semibold text-textHeadingColor'>
                  Create post
                </h3>
                <span
                  className=' absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-textPrimaryColor hover:text-red-500'
                  onClick={() => {
                    photos && photos.map((it) => URL.revokeObjectURL(it))
                    setPhotos && setPhotos([])
                    setModalPost(false)
                  }}
                >
                  <AiOutlineClose />
                </span>
              </div>
              <hr />
              <div className='mt-4 flex items-center gap-3'>
                <figure className='h-[45px] w-[45px] overflow-hidden rounded-full hover:cursor-pointer'>
                  <img
                    src={getUserInfo?.data.avatar || images.avatar}
                    alt='avatar'
                  />
                </figure>
                <div className='flex flex-col items-start'>
                  <h1 className='text-textHeadingColor'>
                    {getUserInfo?.data.firstname}&nbsp;
                    {getUserInfo?.data.lastname}
                  </h1>
                  <div
                    className={`mt-1 flex ${
                      id &&
                      id !== getUserInfo?.data.userId &&
                      typeof getGroupInfoApi.data?.data !== undefined
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    } items-center gap-3 rounded-md bg-bgPrimaryColor px-2 py-1`}
                    onClick={() =>
                      id &&
                      id !== getUserInfo?.data.userId &&
                      typeof getGroupInfoApi.data?.data !== undefined
                        ? {}
                        : handleOpenModalAudience()
                    }
                  >
                    {listAudience.map(
                      (it) =>
                        it.key === audienceValue && (
                          <div className='flex items-center gap-2' key={it.key}>
                            <span className='text-lg'>
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
              <div className='max-h-[350px] overflow-auto'>
                <div className='mt-4 flex items-center'>
                  <textarea
                    {...rest}
                    ref={textAreaRef}
                    className='max-h-[200px] w-full resize-none border-none text-xl outline-none'
                    placeholder={`What's on your mind, ${getUserInfo?.data.lastname}?`}
                    rows={1}
                  />
                  <div>
                    <Tippy
                      interactive
                      arrow={true}
                      trigger='click'
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
                  </div>
                </div>
                <p className='mt-3 text-sm text-red-500'>
                  {errors.content?.message}
                </p>
                <div
                  className={`mt-4  max-h-[300px] grid-cols-1 gap-2 overflow-y-scroll rounded-xl border p-2 ${
                    photos && photos.length > 0 ? 'grid' : 'hidden'
                  }`}
                >
                  {photos &&
                    photos.map((it, i) => (
                      <figure className='relative mb-3' key={it}>
                        <span
                          className='absolute right-1 top-1 cursor-pointer rounded-full bg-primaryColor p-1 text-2xl text-white hover:text-red-500'
                          onClick={() => handleDeletePhoto(it, i)}
                        >
                          <AiOutlineClose />
                        </span>
                        <img
                          className='h-auto w-full cursor-pointer rounded-lg'
                          src={it}
                          alt={`photo-${i}`}
                        />
                      </figure>
                    ))}
                </div>
              </div>
              <div className='mt-4 flex w-full items-center justify-between rounded-lg border p-2 shadow'>
                <h1>Add to your post</h1>
                <div className='flex items-center justify-center'>
                  <label
                    htmlFor='uploadFiles'
                    className='flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-primaryColor/10'
                  >
                    <div className='text-2xl'>
                      <FcAddImage />
                      <input
                        id='uploadFiles'
                        type='file'
                        onChange={handleUploadImage}
                        accept='image/*'
                        multiple
                        hidden
                      />
                    </div>
                  </label>
                  <div className='flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-primaryColor/10'>
                    <span className='text-2xl text-orange-400'>
                      <BsEmojiSmile />
                    </span>
                  </div>
                </div>
              </div>
              <Button
                className={`mt-4 w-full rounded-lg p-3 outline-none hover:opacity-90 ${
                  watch('content').length > 0 || photos!.length > 0
                    ? 'bg-primaryColor text-white'
                    : 'bg-gray-300 text-textPrimaryColor'
                }`}
                onClick={handleSubmit(handlePostFeed)}
                disable={
                  watch('content').length > 0 || photos!.length > 0
                    ? false
                    : true
                }
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
