import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useGetOtp, useResetPassword } from '@/hook'
import Button from '@/components/atoms/Button'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi'

const ForgotPasswordPage = () => {
  const getOtpForm = useForm<ForgotPasswordType>()

  const resetPassForm = useForm<ResetPasswordType>({
    defaultValues: {
      email: '',
      newPassword: '',
      repeatNewPassword: '',
      otp: '',
    },
  })

  const [step, setStep] = useState<number>(0)
  const [eye, setEye] = useState<boolean>(false)

  const getOTPApi = useGetOtp()

  const resetPasswordApi = useResetPassword()

  const handleGetOTP = (value: { email: string }) => {
    getOTPApi.mutate(value.email, {
      onSuccess(data) {
        if (data.data.messageEN === 'Action success') {
          toast.success('Valid email!')
          setStep(1)
        } else {
          toast.error('Invalid email!')
        }
      },
    })
  }

  const handleResetPass = (value: ResetPasswordType) => {
    resetPasswordApi.mutate(value, {
      onSuccess(data) {
        if (data.data.messageEN === 'Incorrect otp code') {
          toast.error('Incorrect otp code!')
          return
        }
        if (data.data.messageEN === 'Profile empty') {
          toast.error('Profile empty!')
          return
        }
        toast.success('Updated password successfully!')
        resetPassForm.reset()
      },
    })
  }

  return (
    <Fragment>
      {step === 0 ? (
        <div className='mt-[61px] flex flex-1 items-center justify-center bg-[#e9ebee] py-20'>
          <div className='my-10 w-[500px] max-w-[95%] rounded-xl bg-white shadow-shadowPrimary sm:my-0'>
            <h1 className='p-5 text-2xl text-primaryColor'>
              Find Your Account
            </h1>
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
                  {...getOtpForm.register('email', {
                    required: {
                      value: true,
                      message: 'Please enter email!',
                    },
                  })}
                  className={`mt-5 w-full rounded-lg border border-thirdColor px-3 py-4 outline-none ${
                    getOtpForm.formState.errors.email
                      ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                      : 'bg-white'
                  }`}
                  placeholder='Email'
                />
                <p className='mt-2 text-sm text-warnColor'>
                  {getOtpForm.formState.errors.email?.message}
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
              <Button
                className='flex max-h-[48px] min-w-[97px] items-center justify-center rounded-lg bg-primaryColor p-3 text-white'
                onClick={getOtpForm.handleSubmit(handleGetOTP)}
              >
                {getOTPApi.isPending ? (
                  <BiLoaderAlt className='animate-spin text-3xl' />
                ) : (
                  'Confirm'
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-[61px] flex flex-1 items-center justify-center bg-[#e9ebee] py-20'>
          <div className='my-10 w-[500px] max-w-[95%] rounded-xl bg-white shadow-shadowPrimary sm:my-0'>
            <h1 className='p-5 text-2xl text-primaryColor'>
              Find Your Account
            </h1>
            <div className='flex items-center'>
              <span className='h-px flex-1 bg-secondColor opacity-30'></span>
            </div>
            <div className='p-5 text-lg text-textHeadingColor'>
              <form>
                <div className='input-group mb-4'>
                  <input
                    type='text'
                    {...resetPassForm.register('email', {
                      required: {
                        value: true,
                        message: 'Please enter email!',
                      },
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Please enter the correct email format!',
                      },
                    })}
                    className={`w-full rounded-lg border border-thirdColor px-3 py-4 outline-none ${
                      resetPassForm.formState.errors.email
                        ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                        : 'bg-white'
                    }`}
                    placeholder='Email'
                  />
                  <p className='mt-2 text-sm text-warnColor'>
                    {resetPassForm.formState.errors.email?.message}
                  </p>
                </div>

                <div className='input-group mb-4'>
                  <div
                    className={`flex items-center gap-1 rounded-lg border border-thirdColor px-3 ${
                      resetPassForm.formState.errors.newPassword
                        ? 'border-warnColor bg-red-50'
                        : 'bg-white'
                    }`}
                  >
                    <input
                      type={eye ? 'text' : 'password'}
                      {...resetPassForm.register('newPassword', {
                        required: {
                          value: true,
                          message: 'Please enter password!',
                        },
                      })}
                      autoComplete='on'
                      className={`h-full flex-1 bg-transparent py-4 outline-none ${
                        resetPassForm.formState.errors.newPassword &&
                        'placeholder-lightWarnColor'
                      }`}
                      placeholder='New password'
                    />
                    <span className='cursor-pointer'>
                      {!eye ? (
                        <FaRegEye onClick={() => setEye(true)} />
                      ) : (
                        <FaRegEyeSlash onClick={() => setEye(false)} />
                      )}
                    </span>
                  </div>
                  <p className='mt-2 text-sm text-warnColor'>
                    {resetPassForm.formState.errors.newPassword?.message}
                  </p>
                </div>

                <div className='input-group mb-4'>
                  <div
                    className={`flex items-center gap-1 rounded-lg border border-thirdColor px-3 ${
                      resetPassForm.formState.errors.repeatNewPassword
                        ? 'border-warnColor bg-red-50'
                        : 'bg-white'
                    }`}
                  >
                    <input
                      type={eye ? 'text' : 'password'}
                      {...resetPassForm.register('repeatNewPassword', {
                        required: {
                          value: true,
                          message: 'Please enter password!',
                        },
                      })}
                      autoComplete='on'
                      className={`h-full flex-1 bg-transparent py-4 outline-none ${
                        resetPassForm.formState.errors.repeatNewPassword &&
                        'placeholder-lightWarnColor'
                      }`}
                      placeholder='Confirm password'
                    />
                    <span className='cursor-pointer'>
                      {!eye ? (
                        <FaRegEye onClick={() => setEye(true)} />
                      ) : (
                        <FaRegEyeSlash onClick={() => setEye(false)} />
                      )}
                    </span>
                  </div>
                  <p className='mt-2 text-sm text-warnColor'>
                    {resetPassForm.formState.errors.repeatNewPassword?.message}
                  </p>
                </div>
                <div className='input-group mb-4'>
                  <input
                    type='number'
                    {...resetPassForm.register('otp', {
                      required: {
                        value: true,
                        message: 'Please enter otp!',
                      },
                    })}
                    className={`w-full rounded-lg border border-thirdColor px-3 py-4 outline-none ${
                      resetPassForm.formState.errors.otp
                        ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                        : 'bg-white'
                    }`}
                    placeholder='OTP'
                  />
                  <p className='mt-2 text-sm text-warnColor'>
                    {resetPassForm.formState.errors.otp?.message}
                  </p>
                </div>
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
              <Button
                className='flex max-h-[48px] min-w-[97px] items-center justify-center rounded-lg bg-primaryColor p-3 text-white'
                onClick={resetPassForm.handleSubmit(handleResetPass)}
              >
                {resetPasswordApi.isPending ? (
                  <BiLoaderAlt className='animate-spin text-3xl' />
                ) : (
                  'Confirm'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ForgotPasswordPage
