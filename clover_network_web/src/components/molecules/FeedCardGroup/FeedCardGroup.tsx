import images from '@/assets/images'
import { CloverOutlineIcon } from '@/components/atoms/Icons'
import { listAudienceGroup } from '@/utils/data'
import { GoCommentDiscussion } from 'react-icons/go'
import { PiShareFat } from 'react-icons/pi'
import TimeAgo from '../TimeAgo'
import { Fragment, useState } from 'react'
import { Modal } from 'antd'
import Button from '@/components/atoms/Button'

interface iProps {
  data: FeedGroupData
  innerRef?: React.Ref<HTMLParagraphElement>
}

const FeedCardGroup = ({ data, innerRef }: iProps) => {
  const [photoView, setPhotoView] = useState<string>('')

  return (
    <Fragment>
      <div
        className='mt-4 w-full rounded-lg border bg-white p-3'
        ref={innerRef}
      >
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <figure className='h-[45px] w-[45px] overflow-hidden rounded-md hover:cursor-pointer'>
              <img
                src={data.groupItem.bannerImgUrl || images.miniBanner}
                alt='avatar'
              />
            </figure>
            <figure className='border-1 absolute -bottom-1 -right-1 h-[26px] w-[26px] overflow-hidden rounded-full border border-white hover:cursor-pointer'>
              <img
                src={data.authorProfile.avatarImgUrl || images.avatar}
                alt='avatar'
              />
            </figure>
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
                to={`/profile/${data.authorProfile.userWallId}`}
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
        <div className='grid grid-cols-3'>
          <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
            <span className='text-2xl text-textPrimaryColor'>
              <CloverOutlineIcon height='28px' width='28px' />
            </span>
            <p className='font-medium text-textPrimaryColor'>Like</p>
          </div>
          <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
            <span className='text-2xl text-textPrimaryColor'>
              <GoCommentDiscussion />
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
    </Fragment>
  )
}

export default FeedCardGroup
