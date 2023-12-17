import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BiLoaderAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/atoms/Button'
import { usePostLogin } from '@/hook'

const SecondHeader = () => {
  const router = useNavigate()

  const loginApi = usePostLogin()

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
        toast.error('Please verify email!')
      },
    })
  }

  return (
    <header className='fixed left-0 right-0 top-0 flex h-[61px] items-center justify-center bg-white px-3 shadow-md sm:justify-between'>
      <Button to={'/login'} className='flex items-center gap-1'>
        <figure className='w-12'>
          <img src='../../logo.png' />
        </figure>
        <h1 className='text-4xl text-primaryColor'>Clover</h1>
      </Button>
      <form className='hidden items-center gap-3 sm:flex'>
        <div className='flex items-center'>
          <input
            type='email'
            id='email'
            {...register('email', {
              required: {
                value: true,
                message: 'Please enter email!',
              },
            })}
            className={` w-full rounded-lg border border-thirdColor/50 px-3 py-2 outline-none ${
              errors.email
                ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                : 'bg-white'
            }`}
            placeholder={`${errors.email?.message || 'Email'}`}
          />
        </div>
        <div className='flex items-center'>
          <input
            type='password'
            id='password'
            {...register('password', {
              required: {
                value: true,
                message: 'Please enter password!',
              },
            })}
            autoComplete='on'
            className={` w-full rounded-lg border border-thirdColor/50 px-3 py-2 outline-none ${
              errors.password
                ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                : 'bg-white'
            }`}
            placeholder={`${errors.password?.message || 'Password'}`}
          />
        </div>
        <Button
          className='flex max-h-[42px] items-center justify-center rounded-lg bg-primaryColor px-3 py-4 font-semibold text-white hover:opacity-90'
          onClick={handleSubmit(handleLogin)}
        >
          {loginApi.isPending ? (
            <BiLoaderAlt className='animate-spin text-3xl' />
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </header>
  )
}

export default SecondHeader
