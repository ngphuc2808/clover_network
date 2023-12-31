import images from '@/assets/images'
import { CloverOutlineIcon } from '@/components/atoms/Icons'
import { listAudienceGroup } from '@/utils/data'
import { PiShareFat } from 'react-icons/pi'
import TimeAgo from '../TimeAgo'
import { Fragment } from 'react'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import { useGetFeedLink, useGetListComment } from '@/hook'

interface iProps {
  data: FeedGroupData
  innerRef?: React.Ref<HTMLParagraphElement>
}

const FeedCardGroupDetail = ({ data, innerRef }: iProps) => {
  const getFeedLinkApi = useGetFeedLink()

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

  const getListCommnetApi = useGetListComment(data.feedItem.postId)

  return (
    <Fragment>
      <div className='w-full rounded-lg bg-white p-3' ref={innerRef}>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Button to={`/groups/${data.groupItem.groupId}`}>
              <figure className='h-[45px] w-[45px] overflow-hidden rounded-md hover:cursor-pointer'>
                <img
                  src={data.groupItem.bannerUrl || images.miniBanner}
                  alt='avatar'
                  className='h-full w-full object-cover'
                />
              </figure>
            </Button>
            <Button to={`/profile/${data.authorProfile.userId}`}>
              <figure className='border-1 absolute -bottom-1 -right-1 h-[26px] w-[26px] overflow-hidden rounded-full border border-white hover:cursor-pointer'>
                <img
                  src={data.authorProfile.avatarImgUrl || images.avatar}
                  alt='avatar'
                  className='h-full w-full object-cover'
                />
              </figure>
            </Button>
          </div>
          <div>
            <Button
              to={`/groups/${data.groupItem.groupId}`}
              className='text-textHeadingColor'
            >
              {data.groupItem.groupName}
            </Button>
            <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
              <Button
                to={`/profile/${data.authorProfile.userId}`}
                className='text-sm text-textPrimaryColor'
              >
                {data.authorProfile.displayName}
              </Button>
              <TimeAgo timestamp={data.feedItem.createdTime} />
              {listAudienceGroup.map(
                (it) =>
                  it.value === data.feedItem.privacyType && (
                    <div className='flex items-center gap-2' key={it.key}>
                      <span className=''>
                        <it.icon />
                      </span>
                    </div>
                  ),
              )}
            </h1>
          </div>
        </div>
        <p className='mt-3 text-sm text-textPrimaryColor'>
          {data.feedItem.content}
        </p>
        <div className='mt-3 grid gap-2'>
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
            <p className='text-sm text-textPrimaryColor'>{data.totalReact}</p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-textPrimaryColor'>
              {data.totalComment} comments
            </p>
          </div>
        </div>
        <div className='my-3 flex items-center'>
          <span className='h-px w-full bg-secondColor opacity-30'></span>
        </div>
        <div className='flex justify-between'>
          <div className='flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1 hover:bg-primaryColor/10'>
            <span className='text-2xl text-textPrimaryColor'>
              <CloverOutlineIcon height='28px' width='28px' />
            </span>
            <p className='font-medium text-textPrimaryColor'>Like</p>
          </div>
          <div
            className='flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1 hover:bg-primaryColor/10'
            onClick={handleCopyLink}
          >
            <span className='text-2xl text-textPrimaryColor'>
              <PiShareFat />
            </span>
            <p className='font-medium text-textPrimaryColor'>Share</p>
          </div>
        </div>
        <div>
          <h3
            className='my-3 cursor-pointer text-primaryColor'
            onClick={() => getListCommnetApi.fetchNextPage()}
          >
            See more
          </h3>
          <ul className='max-h-[230px] w-full overflow-y-auto'>
            {getListCommnetApi.data?.pages.map((data, index) =>
              data.data.length > 0 ? (
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
                          <TimeAgo timestamp={it.createdTime} />
                        </span>
                      </h1>
                    </div>
                  </li>
                ))
              ) : (
                <li key={index} className='mt-3 text-center'>
                  There are currently no comments
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default FeedCardGroupDetail
