import { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BiLoaderAlt } from 'react-icons/bi'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'

import { usePostLogin } from '@/hook'

import Button from '@/components/atoms/Button'

const LoginPage = () => {
  const router = useNavigate()

  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  const [eye, setEye] = useState<boolean>(false)

  const loginApi = usePostLogin()

  useEffect(() => {
    if (isLogin) {
      router('/')
      return
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>()

  const handleLogin = (data: LoginType) => {
    loginApi.mutate(data, {
      onSuccess(data) {
        if (data.data.messageEN === 'Action success') {
          localStorage.setItem('userLogin', JSON.stringify(data.data.data))
          router('/')
          return
        }
        if (data.data.messageEN === 'Profile empty ') {
          toast.error('Account not found, please check again!')
          return
        }
        if (data.data.messageEN === 'Email or password is incorrect') {
          toast.error('Wrong email or password, please check again!')
          return
        }
        if (data.data.messageEN === 'Invalid data input') {
          toast.error('Invalid data input, please check again!')
          return
        }
        toast.error('Please verify email!')
      },
    })
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='Login page' />
      </Helmet>
      <div className='col-span-full flex flex-col justify-center p-8 md:p-20 lg:col-span-6 lg:p-32'>
        <div className='mb-5 flex items-center justify-center gap-3'>
          <figure className='h-20 w-20 rounded-full border border-secondColor p-3'>
            <img src='../../logo.png' alt='logo' />
          </figure>
          <h1 className='text-5xl font-semibold text-primaryColor'>Clover</h1>
        </div>
        <h1 className='mx-auto mb-10 text-3xl font-semibold text-primaryColor'>
          Welcome back!
        </h1>
        <form className='mb-6'>
          <div className='mb-5'>
            <input
              type='email'
              id='email'
              {...register('email', {
                required: {
                  value: true,
                  message: 'Please enter email!',
                },
              })}
              className={`w-full rounded-lg border border-thirdColor px-3 py-4 outline-none ${
                errors.email
                  ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                  : 'bg-white'
              }`}
              placeholder='Email'
            />
            <p className='mt-2 text-sm text-warnColor'>
              {errors.email?.message}
            </p>
          </div>
          <div className='mb-16'>
            <div
              className={`flex items-center gap-1 rounded-lg border border-thirdColor px-3 outline-none ${
                errors.password
                  ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                  : 'bg-white'
              }`}
            >
              <input
                type={eye ? 'text' : 'password'}
                id='password'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Please enter password!',
                  },
                })}
                autoComplete='on'
                className={`h-full flex-1 bg-transparent py-4 outline-none ${
                  errors.password && 'placeholder-lightWarnColor'
                }`}
                placeholder='Password'
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
              {errors.password?.message}
            </p>
          </div>
          <Button
            className='flex max-h-[56px] w-full items-center justify-center rounded-lg bg-primaryColor px-3 py-4 font-semibold text-white shadow-formButton hover:opacity-90'
            onClick={handleSubmit(handleLogin)}
          >
            {loginApi.isPending ? (
              <BiLoaderAlt className='animate-spin text-3xl' />
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
        <div className='flex w-full items-center justify-between lg:block xl:flex'>
          <div className='flex items-center'>
            <span>Don't have account ?</span>
            <Button
              to={'/register'}
              className='ml-2 font-semibold hover:opacity-80'
            >
              Sign up
            </Button>
          </div>
          <div className='flex items-center'>
            <Button
              to={'/identify'}
              className='mt-0 font-semibold hover:opacity-80 lg:mt-3 xl:mt-0'
            >
              Forgotten password?
            </Button>
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default LoginPage
