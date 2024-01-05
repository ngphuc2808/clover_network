import Button from '@/components/atoms/Button'
import TimeAgo from '../TimeAgo'
import images from '@/assets/images'
import { listAudienceUser } from '@/utils/data'

interface iProps {
  data: FeedGroupData
}

const FeedCardGroup = ({ data }: iProps) => {
  return (
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

export default FeedCardGroup
