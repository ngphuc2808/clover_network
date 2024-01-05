import { Fragment, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Radio } from 'antd'

import Button from '@/components/atoms/Button'
import { BsArrowLeftShort } from 'react-icons/bs'
import { listAudience, listAudienceGroup } from '@/utils/data'

interface iProps {
  handleCloseModalAudience: () => void
  audienceValue: string
  setAudienceValue: (audience: string) => void
}

const ModalAudience = ({
  handleCloseModalAudience,
  audienceValue,
  setAudienceValue,
}: iProps) => {
  const [value, setValue] = useState<string>(audienceValue)

  const location = useLocation()

  return (
    <Fragment>
      <div className='fixed inset-0 z-50 bg-gray-500 bg-opacity-40'></div>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center transition'>
        <div className='relative z-20 max-h-full w-full max-w-[90%] sm:max-w-lg'>
          <div className='relative rounded-md bg-white shadow'>
            <div className='p-4 text-center'>
              <div className='relative mb-4 flex items-center justify-center'>
                <span
                  className='absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-bgPrimaryColor text-2xl text-textPrimaryColor hover:text-primaryColor'
                  onClick={() => handleCloseModalAudience()}
                >
                  <BsArrowLeftShort />
                </span>
                <h3 className='mb-1 text-xl font-semibold text-textHeadingColor'>
                  Post Audience
                </h3>
              </div>
              <hr />
              <div className='mt-4'>
                <h1 className='text-left text-lg font-semibold'>
                  Who can see your post?
                </h1>
                <p className='mt-2 text-left text-textPrimaryColor'>
                  Your post will show up in Feed, on your profile and in search
                  results.
                </p>
                <p className='mt-5 text-left text-textPrimaryColor'>
                  Your default audience is set to Friends, but you can change
                  the audience of this specific post.
                </p>
              </div>
              <ul className='mt-4 max-h-[240px] overflow-y-scroll'>
                {!location.pathname.includes('groups')
                  ? listAudience.map((it) => (
                      <li
                        className={`flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200/60`}
                        onClick={() => setValue(it.key)}
                        key={it.key}
                      >
                        <span className='rounded-full bg-gray-200 p-5 text-2xl'>
                          {<it.icon />}
                        </span>
                        <div className='flex-1 text-left'>
                          <h1 className='text-xl font-semibold text-textHeadingColor'>
                            {it.value}
                          </h1>
                          <p className='text-textPrimaryColor'>{it.desc}</p>
                        </div>
                        <Radio value={it.key} checked={value === it.key} />
                      </li>
                    ))
                  : listAudienceGroup.map((it) => (
                      <li
                        className={`flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200/60`}
                        onClick={() => setValue(it.key)}
                        key={it.key}
                      >
                        <span className='rounded-full bg-gray-200 p-5 text-2xl'>
                          {<it.icon />}
                        </span>
                        <div className='flex-1 text-left'>
                          <h1 className='text-xl font-semibold text-textHeadingColor'>
                            {it.value}
                          </h1>
                          <p className='text-textPrimaryColor'>{it.desc}</p>
                        </div>
                        <Radio value={it.key} checked={value === it.key} />
                      </li>
                    ))}
              </ul>
              <div className='flex items-center justify-end gap-3'>
                <Button
                  className='mt-4 w-1/4 rounded-lg p-3 text-primaryColor hover:bg-gray-300'
                  onClick={() => handleCloseModalAudience()}
                >
                  Cancel
                </Button>
                <Button
                  className='mt-4 w-1/4 rounded-lg bg-primaryColor p-3 text-white hover:opacity-90'
                  onClick={() => {
                    handleCloseModalAudience()
                    setAudienceValue(value)
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ModalAudience
