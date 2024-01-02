import Button from '@/components/atoms/Button'
import TimeAgo from '../TimeAgo'
import images from '@/assets/images'
import { listAudienceGroup } from '@/utils/data'
import { MdArrowRight } from 'react-icons/md'

interface iProps {
  data: FeedGroupData
  userLastName: string
}

const FeedCardUser = ({ data, userLastName }: iProps) => {
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
        <div className='flex items-center gap-1'>
          <Button
            to={`/profile/${data.authorProfile.userId}`}
            className='text-textHeadingColor'
          >
            {data.authorProfile.displayName}
          </Button>
          <span className='text-2xl'>
            <MdArrowRight />
          </span>
          <Button
            to={`/profile/${data.feedItem.toUserId}`}
            className='text-textHeadingColor'
          >
            {userLastName}
          </Button>
        </div>
        <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
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
  )
}

export default FeedCardUser
