import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/atoms/Button'

const ForgotPasswordPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm<ForgotPasswordType>()

  return (
    <Fragment>
      <div className='mt-[61px] flex flex-1 items-center justify-center bg-[#e9ebee]'>
        <div className='my-10 w-[500px] max-w-[95%] rounded-xl bg-white shadow-shadowPrimary sm:my-0'>
          <h1 className='p-5 text-2xl text-primaryColor'>Find Your Account</h1>
          <div className='flex items-center'>
            <span className='h-px flex-1 bg-secondColor opacity-30'></span>
          </div>
          <div className='p-5 text-lg text-textHeadingColor'>
            <h3>
              Please enter your email address to identify for your account.
            </h3>
            <form>
              <input
                type='email'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Please enter email!',
                  },
                })}
                className={`mt-5 w-full rounded-lg border border-thirdColor px-3 py-4 outline-none ${
                  errors.email
                    ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                    : 'bg-white'
                }`}
                placeholder='Email'
              />
              <p className='mt-2 text-sm text-warnColor'>
                {errors.email?.message}
              </p>
            </form>
          </div>
          <div className='flex items-center'>
            <span className='h-px flex-1 bg-secondColor opacity-30'></span>
          </div>
          <div className='flex w-full items-center justify-end gap-3 p-5'>
            <Button
              to={'/login'}
              className='min-w-[97px] rounded-lg bg-gray-200 p-3 text-center text-textHeadingColor'
            >
              Cancel
            </Button>
            <Button className='min-w-[97px] rounded-lg bg-primaryColor p-3 text-white'>
              Confirm
            </Button>
          </div>
        </div>
      </div>
      {/* <div className='mt-[61px] flex flex-1 items-center justify-center bg-[#e9ebee]'>
        <div className='my-10 w-[500px] max-w-[95%] rounded-xl bg-white shadow-shadowPrimary sm:my-0'>
          <h1 className='p-5 text-2xl text-primaryColor'>Find Your Account</h1>
          <div className='flex items-center'>
            <span className='h-px flex-1 bg-secondColor opacity-30'></span>
          </div>
          <div className='p-5 text-lg text-textHeadingColor'>
            <h3>New password.</h3>
            <form>
              <input
                type='password'
                id='password'
                className='mt-5 w-full rounded-lg border border-thirdColor px-3 py-4 outline-none'
                placeholder='Password'
              />
              <input
                type='password'
                id='newPassword'
                className='mt-5 w-full rounded-lg border border-thirdColor px-3 py-4 outline-none'
                placeholder='New password'
              />
              <input
                type='password'
                id='confirmNewPassword'
                className='mt-5 w-full rounded-lg border border-thirdColor px-3 py-4 outline-none'
                placeholder='Confirm new password'
              />
            </form>
          </div>
          <div className='flex items-center'>
            <span className='h-px flex-1 bg-secondColor opacity-30'></span>
          </div>
          <div className='flex w-full items-center justify-end gap-3 p-5'>
            <Button
              to={'/login'}
              className='min-w-[97px] rounded-lg bg-gray-200 p-3 text-center text-textHeadingColor'
            >
              Cancel
            </Button>
            <Button className='min-w-[97px] rounded-lg bg-primaryColor p-3 text-white'>
              Confirm
            </Button>
          </div>
        </div>
      </div> */}
    </Fragment>
  )
}

export default ForgotPasswordPage
