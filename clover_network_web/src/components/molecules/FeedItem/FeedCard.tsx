import Button from '@/components/atoms/Button'
import TimeAgo from '../TimeAgo'
import images from '@/assets/images'
import { listAudienceUser } from '@/utils/data'

interface iProps {
  data: FeedGroupData
}

const FeedCard = ({ data }: iProps) => {
  return (
    <div className='flex items-center gap-3'>
      <Button to={`/profile/${data.authorProfile.userId}`}>
        <figure className='h-[40px] w-[40px] overflow-hidden rounded-full hover:cursor-pointer'>
          <img
            src={data.authorProfile.avatarImgUrl || images.avatar}
            alt='avatar'
          />
        </figure>
      </Button>
      <div>
        <Button
          to={`/profile/${data.authorProfile.userId}`}
          className='text-textHeadingColor'
        >
          {data.authorProfile.displayName}
        </Button>
        <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
          <TimeAgo timestamp={data.feedItem.createdTime} />
          {listAudienceUser.map(
            (it) =>
              it.key === data.feedItem.privacyType && (
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
  )
}

export default FeedCard
