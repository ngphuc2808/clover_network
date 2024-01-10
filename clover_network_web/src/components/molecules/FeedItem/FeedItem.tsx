import { Fragment, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Dropdown, Modal } from 'antd'
import type { MenuProps } from 'antd'
import { GoCommentDiscussion } from 'react-icons/go'
import { PiShareFat } from 'react-icons/pi'
import { IoMdSend } from 'react-icons/io'

import images from '@/assets/images'
import {
  useDisableFeed,
  useGetFeedDetail,
  useGetFeedLink,
  useGetFetchQuery,
  useGetUserLike,
  usePostComment,
  usePostLike,
} from '@/hook'
import { CloverLikeIcon, CloverOutlineIcon } from '@/components/atoms/Icons'
import FeedItemDetail from './FeedItemDetail'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

interface iProps {
  data: FeedGroupData
  innerRef?: React.Ref<HTMLParagraphElement>
  children: ReactNode
}

const FeedItem = ({ data, innerRef, children }: iProps) => {
  const queryClient = useQueryClient()
  const getUserInfo = useGetFetchQuery<ResponseUserType>(['UserInfo'])

  const [photoView, setPhotoView] = useState<string>('')
  const [openModalComment, setOpenModalComment] = useState<boolean>(false)

  const getFeedDetailApi = useGetFeedDetail()

  const getFeedLinkApi = useGetFeedLink()

  const commentApi = usePostComment()

  const checkLikeApi = useGetUserLike()

  const deleteFeedApi = useDisableFeed()

  const [isLike, setIsLike] = useState<string | null>(data.currentUserReact!)

  const [totalLike, setTotalLike] = useState<number>(data.totalReact)

  const [totalComment, setTotalComment] = useState<number>(data.totalComment)

  const likeApi = usePostLike()

  const formComment = useForm<FeedCommentType>({
    defaultValues: {
      postId: data.feedItem.postId,
      authorId: getUserInfo?.data.userId,
      content: '',
      level: 0,
    },
  })

  const handleCopyLink = () => {
    getFeedLinkApi.mutate(data.feedItem.postId, {
      onSuccess(data) {
        navigator.clipboard
          .writeText(data.data.data)
          .then(() => {
            toast.success('Copy path successfully!')
          })
          .catch(() => {
            console.error('Copy path failed!')
          })
      },
    })
  }

  const handleGetFeedDetail = () => {
    getFeedDetailApi.mutate(data.feedItem.postId, {
      onSuccess() {
        setOpenModalComment(true)
      },
    })
  }

  const handleComment = (value: FeedCommentType) => {
    commentApi.mutate(value, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['ListComment'] })
        setTotalComment(totalComment + 1)
        formComment.reset()
      },
    })
  }

  const handleReactFeed = () => {
    checkLikeApi.mutate(data.feedItem.postId, {
      onSuccess(dataFeed) {
        if (dataFeed.data.data.currentUserLike) {
          setIsLike(null)
          likeApi.mutate(
            {
              postId: data.feedItem.postId,
              reactType: 'LIKE',
              status: 0,
            },
            {
              onSuccess(dataLike) {
                setTotalLike(dataLike.data.data)
              },
            },
          )
        } else {
          setIsLike('LIKE')
          likeApi.mutate(
            {
              postId: data.feedItem.postId,
              reactType: 'LIKE',
              status: 1,
            },
            {
              onSuccess(dataLike) {
                setTotalLike(dataLike.data.data)
              },
            },
          )
        }
      },
    })
  }

  const handleDeletePost = () => {
    deleteFeedApi.mutate(data.feedItem.postId, {
      onSuccess(data) {
        console.log(data)
        if (data.data.messageEN === 'Action success') {
          toast.success('Delete feed successfully!')
          queryClient.invalidateQueries({ queryKey: ['ListFeed'] })
          queryClient.invalidateQueries({ queryKey: ['ListFeedOfGroup'] })
          queryClient.invalidateQueries({ queryKey: ['ListAllGroupHome'] })
        } else {
          toast.error('You have not permission to do that!')
        }
      },
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <p>Edit</p>,
    },
    {
      key: '2',
      label: <p onClick={handleDeletePost}>Delete</p>,
    },
  ]

  return (
    <Fragment>
      <div
        className='mb-4 w-full rounded-lg border bg-white p-3'
        ref={innerRef}
      >
        <div className='flex items-center justify-between'>
          {children}
          {(data.feedItem.authorId === getUserInfo?.data.userId ||
            (data.currentUserRole !== null &&
              (data.currentUserRole.roleId === 'OWNER' ||
                data.currentUserRole.roleId === 'ADMIN'))) && (
            <Dropdown menu={{ items }} placement='bottom'>
              <span className='cursor-pointer text-xl text-primaryColor hover:opacity-80'>
                <BiDotsHorizontalRounded />
              </span>
            </Dropdown>
          )}
        </div>
        <p
          className='mt-3 text-sm text-textPrimaryColor'
          dangerouslySetInnerHTML={{ __html: data.feedItem.htmlContent }}
        />
        <div className='mt-3 grid gap-2'>
          {data.feedItem.feedImages &&
            (data.feedItem.feedImages.length === 1 ? (
              <figure
                onClick={() => setPhotoView(data.feedItem.feedImages![0])}
                className='h-auto max-h-[600px] w-full cursor-pointer overflow-hidden rounded-md border'
              >
                <img
                  className='h-full w-full cursor-pointer object-contain'
                  src={data.feedItem.feedImages[0]}
                  alt='photo'
                />
              </figure>
            ) : data.feedItem.feedImages?.length === 2 ? (
              <div className='grid grid-cols-2 gap-2'>
                {data.feedItem.feedImages?.map((it, i) => (
                  <figure
                    onClick={() => setPhotoView(it)}
                    key={i}
                    className='h-48 w-full cursor-pointer overflow-hidden rounded-md border'
                  >
                    <img
                      className='h-full w-full cursor-pointer object-contain'
                      src={it}
                      alt='photo'
                    />
                  </figure>
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-2'>
                <figure
                  onClick={() => setPhotoView(data.feedItem.feedImages![0])}
                  className='h-auto max-h-[600px] w-full cursor-pointer overflow-hidden rounded-md border'
                >
                  <img
                    className='h-full w-full cursor-pointer object-contain'
                    src={data.feedItem.feedImages[0]}
                    alt='photo'
                  />
                </figure>
                <div className='grid grid-cols-2 gap-2'>
                  {data.feedItem.feedImages?.slice(1).map((it, i) => (
                    <figure
                      onClick={() => setPhotoView(it)}
                      key={i}
                      className='h-48 w-full cursor-pointer overflow-hidden rounded-md border'
                    >
                      <img
                        className='h-full w-full cursor-pointer object-contain'
                        src={it}
                        alt='photo'
                      />
                    </figure>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className='my-3 flex items-center'>
          <span className='h-px w-full bg-secondColor opacity-30'></span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <span className=' text-textPrimaryColor'>
              <CloverOutlineIcon height='20px' width='20px' />
            </span>
            <p className='text-sm text-textPrimaryColor'>{totalLike}</p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-textPrimaryColor'>
              {totalComment} comments
            </p>
          </div>
        </div>
        <div className='my-3 flex items-center'>
          <span className='h-px w-full bg-secondColor opacity-30'></span>
        </div>
        <div
          className={`grid ${
            data.groupItem.groupType !== 2 ? ' grid-cols-3' : ' grid-cols-2'
          }`}
        >
          <div
            className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'
            onClick={handleReactFeed}
          >
            <span className='text-2xl text-textPrimaryColor'>
              {!isLike ? (
                <CloverOutlineIcon height='28px' width='28px' />
              ) : (
                <CloverLikeIcon height='28px' width='28px' />
              )}
            </span>
            <p
              className={`font-medium ${
                isLike ? 'text-primaryColor' : 'text-textPrimaryColor'
              }`}
            >
              Like
            </p>
          </div>
          <div
            className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'
            onClick={handleGetFeedDetail}
          >
            <span className='text-2xl text-textPrimaryColor'>
              <GoCommentDiscussion />
            </span>
            <p className='font-medium text-textPrimaryColor'>Comment</p>
          </div>
          {data.groupItem.groupType !== 2 && (
            <div
              className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'
              onClick={handleCopyLink}
            >
              <span className='text-2xl text-textPrimaryColor'>
                <PiShareFat />
              </span>
              <p className='font-medium text-textPrimaryColor'>Share</p>
            </div>
          )}
        </div>
      </div>
      <Modal
        title={<h1 className='text-xl text-textHeadingColor'>Photo</h1>}
        open={!!photoView}
        onCancel={() => setPhotoView('')}
        footer={null}
        width='60%'
      >
        <figure className='h-auto max-h-[600px] w-full cursor-pointer overflow-hidden rounded-md border'>
          <img
            className='h-full w-full cursor-pointer object-contain'
            src={photoView}
            alt='photo'
          />
        </figure>
      </Modal>
      <Modal
        open={openModalComment}
        onCancel={() => setOpenModalComment(false)}
        footer={
          <div className='flex items-center gap-3'>
            <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
              <img
                src={getUserInfo?.data.avatar || images.avatar}
                alt='avatar'
              />
            </figure>
            <div className='flex flex-1 items-center rounded-full bg-bgPrimaryColor px-3 text-left text-sm text-textPrimaryColor outline-none hover:bg-primaryColor/10'>
              <input
                {...formComment.register('content')}
                className='h-full w-full bg-transparent py-3 outline-none'
                placeholder='Write a comment...'
              />
              <span
                className='cursor-pointer text-xl text-primaryColor'
                onClick={formComment.handleSubmit(handleComment)}
              >
                <IoMdSend />
              </span>
            </div>
          </div>
        }
      >
        <FeedItemDetail
          totalComment={totalComment}
          isLike={isLike}
          setIsLike={setIsLike}
          totalLike={totalLike}
          setTotalLike={setTotalLike}
          data={getFeedDetailApi.data?.data.data!}
        >
          {children}
        </FeedItemDetail>
      </Modal>
    </Fragment>
  )
}

export default FeedItem
