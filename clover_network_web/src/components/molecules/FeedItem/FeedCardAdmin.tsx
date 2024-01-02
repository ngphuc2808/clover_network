import images from '@/assets/images'
import { FaEarthAsia } from 'react-icons/fa6'

const FeedCardAdmin = () => {
  return (
    <div className='flex items-center gap-3'>
      <figure className='h-[40px] w-[40px] overflow-hidden rounded-md hover:cursor-pointer'>
        <img src={images.miniBanner} alt='avatar' />
      </figure>
      <div>
        <h1 className='text-textHeadingColor'>Clover Network</h1>
        <h1 className='flex items-center gap-2 text-sm text-textPrimaryColor'>
          System
          <div className='flex items-center gap-2'>
            <span className=''>
              <FaEarthAsia />
            </span>
          </div>
        </h1>
      </div>
    </div>
  )
}

export default FeedCardAdmin
