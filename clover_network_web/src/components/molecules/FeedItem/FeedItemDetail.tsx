import { CloverLikeIcon, CloverOutlineIcon } from '@/components/atoms/Icons'
import { PiShareFat } from 'react-icons/pi'
import TimeAgo from '../TimeAgo'
import { Fragment, ReactNode } from 'react'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import {
  useGetFeedLink,
  useGetListComment,
  useGetUserLike,
  usePostLike,
} from '@/hook'
import images from '@/assets/images'
import { useQueryClient } from '@tanstack/react-query'
import { Col, Row } from 'antd'

interface iProps {
  data: FeedGroupData
  totalLike: number
  setTotalLike: (totalLike: number) => void
  totalComment: number
  isLike: string | null
  setIsLike: (isLike: string | null) => void
  innerRef?: React.Ref<HTMLParagraphElement>
  children: ReactNode
}

const FeedItemDetail = ({
  data,
  totalLike,
  totalComment,
  isLike,
  setIsLike,
  setTotalLike,
  innerRef,
  children,
}: iProps) => {
  const queryClient = useQueryClient()

  const getFeedLinkApi = useGetFeedLink()

  const checkLikeApi = useGetUserLike()

  const likeApi = usePostLike()

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
                queryClient.invalidateQueries({ queryKey: ['ListFeed'] })
                queryClient.invalidateQueries({ queryKey: ['ListFeedOfGroup'] })
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
                queryClient.invalidateQueries({ queryKey: ['ListFeed'] })
                queryClient.invalidateQueries({ queryKey: ['ListFeedOfGroup'] })
              },
            },
          )
        }
      },
    })
  }

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

  const getListCommentApi = useGetListComment(data.feedItem.postId)

  return (
    <Fragment>
      <div className='w-full rounded-lg bg-white p-3' ref={innerRef}>
        <div className='flex items-center gap-3'>{children}</div>
        <p
          className='mt-3 text-sm text-textPrimaryColor'
          dangerouslySetInnerHTML={{ __html: data.feedItem.htmlContent }}
        />
        <div className='mt-3 grid max-h-[250px] gap-2 overflow-auto'>
          {data.feedItem.feedImages &&
            (data.feedItem.feedImages.length === 1 ? (
              <figure className='h-auto max-h-[600px] w-full cursor-pointer overflow-hidden rounded-md border'>
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
                <figure className='h-auto max-h-[600px] w-full cursor-pointer overflow-hidden rounded-md border'>
                  <img
                    className='h-full w-full cursor-pointer object-contain'
                    src={data.feedItem.feedImages[0]}
                    alt='photo'
                  />
                </figure>
                <div className='grid grid-cols-2 gap-2'>
                  {data.feedItem.feedImages?.slice(1).map((it, i) => (
                    <figure
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
        <Row>
          <Col span={data.groupItem.groupType !== 2 ? 12 : 24}>
            <div
              onClick={handleReactFeed}
              className='flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1 hover:bg-primaryColor/10'
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
          </Col>
          {data.groupItem.groupType !== 2 && (
            <Col span={12}>
              <div
                className='flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1 hover:bg-primaryColor/10'
                onClick={handleCopyLink}
              >
                <span className='text-2xl text-textPrimaryColor'>
                  <PiShareFat />
                </span>
                <p className='font-medium text-textPrimaryColor'>Share</p>
              </div>
            </Col>
          )}
        </Row>
        <div>
          <h3
            className='my-3 cursor-pointer text-primaryColor'
            onClick={() => {
              console.log(getListCommentApi.hasNextPage)
              if (getListCommentApi.hasNextPage) {
                getListCommentApi.fetchNextPage()
                return
              }
            }}
          >
            {getListCommentApi.hasNextPage
              ? 'See more'
              : 'There are currently no comments'}
          </h3>
          <ul className='max-h-[70px] w-full overflow-y-auto'>
            {getListCommentApi.data?.pages.map(
              (data) =>
                data.data.length > 0 &&
                data.data.map((it) => (
                  <li
                    className='mt-3 flex items-center gap-3'
                    key={it.commentId}
                  >
                    <Button to={`/profile/${it.authorProfile.userId}`}>
                      <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
                        <img
                          src={it.authorProfile.avatarImgUrl || images.avatar}
                          alt='avatar'
                        />
                      </figure>
                    </Button>
                    <div className='flex-1'>
                      <Button
                        to={`/profile/${it.authorProfile.userId}`}
                        className='text-textHeadingColor'
                      >
                        {it.authorProfile.displayName}
                      </Button>
                      <h1 className='flex items-center justify-between gap-2 text-sm text-textHeadingColor'>
                        <p className='text-textPrimaryColor'>{it.content}</p>
                        <span className='text-xs'>
                          <TimeAgo timestamp={it.updatedTime} />
                        </span>
                      </h1>
                    </div>
                  </li>
                )),
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default FeedItemDetail
