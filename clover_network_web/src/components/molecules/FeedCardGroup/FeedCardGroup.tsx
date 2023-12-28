import images from '@/assets/images'
import { listAudienceGroup } from '@/utils/data'
import { AiOutlineLike } from 'react-icons/ai'
import { FaRegCommentAlt } from 'react-icons/fa'
import { PiShareFat } from 'react-icons/pi'

interface iProps {
  data: FeedGroupData
}

const FeedCardGroup = ({ data }: iProps) => {
  console.log(data)
  return (
    <div className='mt-4 w-full rounded-lg border bg-white p-3'>
      <div className='flex items-center gap-3'>
        <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
          <img
            src={data.authorProfile.avatarImgUrl || images.avatar}
            alt='avatar'
          />
        </figure>
        <div>
          <h1 className='text-textHeadingColor'>
            {data.authorProfile.displayName}
          </h1>
          <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
            <p>2h</p>
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
        {data.feedItem.feedImages && (
          <>
            <figure>
              <img
                className='h-auto w-full cursor-pointer rounded-lg'
                src={data.feedItem.feedImages[0]}
                alt='photo'
              />
            </figure>
            <div className='grid grid-cols-2 gap-2'>
              {data.feedItem.feedImages.slice(1).map((it) => (
                <figure>
                  <img
                    className='h-48 w-full cursor-pointer rounded-lg object-cover'
                    src={it}
                    alt='photo'
                  />
                </figure>
              ))}
            </div>
          </>
        )}
      </div>
      <div className='my-3 flex items-center'>
        <span className='h-px w-full bg-secondColor opacity-30'></span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <span className=' text-textPrimaryColor'>
            <AiOutlineLike />
          </span>
          <p className='text-sm text-textPrimaryColor'>{data.totalReact}</p>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-sm text-textPrimaryColor'>
            {data.totalComment} comments
          </p>
          {/* <p className='text-sm text-textPrimaryColor'>{data.to} shares</p> */}
        </div>
      </div>
      <div className='my-3 flex items-center'>
        <span className='h-px w-full bg-secondColor opacity-30'></span>
      </div>
      <div className='grid grid-cols-3'>
        <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
          <span className='text-2xl text-textPrimaryColor'>
            <AiOutlineLike />
          </span>
          <p className='font-medium text-textPrimaryColor'>Like</p>
        </div>
        <div className='flex cursor-pointer items-center justify-center gap-2 px-3 py-1 hover:bg-primaryColor/10'>
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
    </div>
  )
}

export default FeedCardGroup
