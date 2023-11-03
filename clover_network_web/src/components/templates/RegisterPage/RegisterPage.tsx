import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FcGoogle } from 'react-icons/fc'
import { AiFillCalendar } from 'react-icons/ai'
import { BiLoaderAlt } from 'react-icons/bi'

import { usePostRegister } from '@/hook'

import Button from '@/components/atoms/Button'

const RegisterPage = () => {
  const router = useNavigate()

  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  const registerApi = usePostRegister()

  useEffect(() => {
    if (isLogin) {
      router('/')
      return
    }
  }, [])

  const [startDate, setStartDate] = useState(new Date())

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: {
      dayOfBirth: startDate.toISOString().split('T')[0],
    },
  })

  const handleSetDate = (date: Date) => {
    if (date < new Date()) {
      setStartDate(date)
    } else {
      toast.warning('Please choose the correct date of birth!')
    }
    setValue('dayOfBirth', date.toISOString().split('T')[0])
  }

  const handleRegister = (data: RegisterType) => {
    registerApi.mutate(data, {
      onSuccess(data) {
        if (data.data.messageEN === 'Action success') {
          toast.success('Sign up successful, please confirm email!')
          return
        }
        if (data.data.messageEN === 'Existed user ') {
          toast.error('Sign up failed, account already exists!')
          return
        }
      },
    })
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className='grid grid-cols-12 text-textPrimaryColor'>
        <div className="col-span-0 h-screen bg-[url('../../banner.png')] bg-repeat lg:col-span-6"></div>
        <div className='col-span-full flex h-screen flex-col justify-center p-8 md:p-20 lg:col-span-6 lg:p-32'>
          <div className='mb-5 flex items-center justify-center gap-3'>
            <figure className='h-20 w-20 rounded-full border border-secondColor p-3'>
              <img src='logo.png' alt='logo' />
            </figure>
            <h1 className='text-5xl font-semibold text-primaryColor'>Clover</h1>
          </div>
          <h1 className='mx-auto mb-10 text-3xl font-semibold text-primaryColor'>
            Register now!
          </h1>
          <form className='mb-6'>
            <div className='mb-5 flex gap-5'>
              <div className='w-full'>
                <input
                  type='text'
                  id='firstname'
                  {...register('firstname', {
                    required: {
                      value: true,
                      message: 'Please enter a firstname!',
                    },
                    minLength: {
                      value: 2,
                      message: 'Please enter a minimum of 2 characters!',
                    },
                  })}
                  className={`w-full rounded-lg border border-thirdColor px-3 py-4 outline-none ${
                    errors.firstname
                      ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                      : 'bg-white'
                  }`}
                  placeholder='First Name'
                />
                <p className='mt-2 text-sm text-warnColor'>
                  {errors.firstname?.message}
                </p>
              </div>
              <div className='w-full'>
                <input
                  type='text'
                  id='lastname'
                  {...register('lastname', {
                    required: {
                      value: true,
                      message: 'Please enter a lastname!',
                    },
                    minLength: {
                      value: 2,
                      message: 'Please enter a minimum of 2 characters!',
                    },
                  })}
                  className={`w-full rounded-lg border border-thirdColor px-3 py-4 outline-none ${
                    errors.lastname
                      ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                      : 'bg-white'
                  }`}
                  placeholder='Last Name'
                />
                <p className='mt-2 text-sm text-warnColor'>
                  {errors.lastname?.message}
                </p>
              </div>
            </div>
            <div className='mb-5'>
              <input
                type='text'
                id='email'
                {...register('email', {
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
            <div className='mb-5'>
              <input
                type='password'
                id='password'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Please enter password!',
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/,
                    message:
                      'Mật khẩu phải bao gồm ít nhất 8 ký tự, 1 chữ cái viết thường, 1 chữ cái viết hoa và 1 chữ số!',
                  },
                })}
                autoComplete='on'
                className={`w-full rounded-lg border border-thirdColor px-3 py-4 outline-none ${
                  errors.password
                    ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                    : 'bg-white'
                }`}
                placeholder='New Password'
              />
              <p className='mt-2 text-sm text-warnColor'>
                {errors.password?.message}
              </p>
            </div>
            <div className='mb-16 block items-center gap-5 2xl:flex'>
              <div className='relative mb-5 w-full 2xl:mb-0'>
                <label htmlFor='datePicker'>
                  <p className='mb-2'>Date of birth</p>
                  <DatePicker
                    id='datePicker'
                    className={`h-[57.8px] w-full rounded-lg border border-thirdColor text-sm text-gray-500 outline-none`}
                    wrapperClassName='w-full'
                    dayClassName={(date) => {
                      return startDate &&
                        date.toDateString() === startDate.toDateString()
                        ? '!bg-primaryColor'
                        : 'bg-primaryColor/10'
                    }}
                    selected={startDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode='select'
                    onChange={(date: Date) => handleSetDate(date)}
                    showIcon
                    icon={
                      <AiFillCalendar className='right-0 top-1/2 -translate-y-1/2  text-2xl text-primaryColor' />
                    }
                  />
                </label>
              </div>
              <div className='w-full'>
                <p className='mb-2'>Gender</p>
                <div
                  className={`flex items-center justify-center gap-4 rounded-lg border border-secondColor px-2 py-4 ${
                    errors.password
                      ? 'border-warnColor bg-red-50 placeholder-lightWarnColor'
                      : 'bg-white'
                  }`}
                >
                  <label htmlFor='male' className='flex items-center gap-3'>
                    <input
                      type='radio'
                      id='male'
                      {...register('gender', {
                        required: true,
                      })}
                      value={0}
                      className="visible after:relative after:left-[-2px] after:top-[-4px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-[-2px] checked:after:top-[-4px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <p
                      className={`text-sm ${
                        errors.gender ? 'text-warnColor' : 'text-gray-500'
                      }`}
                    >
                      Male
                    </p>
                  </label>
                  <span className='h-6 w-px bg-secondColor'></span>
                  <label htmlFor='female' className='flex items-center gap-3'>
                    <input
                      type='radio'
                      id='female'
                      {...register('gender', {
                        required: true,
                      })}
                      value={1}
                      className="visible after:relative after:left-[-2px] after:top-[-4px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-[-2px] checked:after:top-[-4px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <p
                      className={`text-sm ${
                        errors.gender ? 'text-warnColor' : 'text-gray-500'
                      }`}
                    >
                      Female
                    </p>
                  </label>
                  <span className='h-6 w-px bg-secondColor'></span>
                  <label htmlFor='other' className='flex items-center gap-3'>
                    <input
                      type='radio'
                      id='other'
                      {...register('gender', {
                        required: true,
                      })}
                      value={2}
                      className="visible after:relative after:left-[-2px] after:top-[-4px] after:inline-block after:h-4 after:w-4 after:cursor-pointer after:rounded-full  after:bg-[#d1d3d1] after:content-['']
                      checked:after:visible checked:after:relative checked:after:left-[-2px] checked:after:top-[-4px] checked:after:inline-block checked:after:h-4 checked:after:w-4 checked:after:cursor-pointer checked:after:rounded-full checked:after:bg-green-500 checked:after:content-['']"
                    />
                    <p
                      className={`text-sm ${
                        errors.gender ? 'text-warnColor' : 'text-gray-500'
                      }`}
                    >
                      Other
                    </p>
                  </label>
                </div>
              </div>
            </div>
            <Button
              className='flex min-h-[58px] w-full items-center justify-center rounded-lg bg-primaryColor px-3 py-4 font-semibold text-white shadow-formButton hover:opacity-80'
              onClick={handleSubmit(handleRegister)}
            >
              {registerApi.isLoading ? (
                <BiLoaderAlt className='animate-spin text-3xl' />
              ) : (
                'Sign up'
              )}
            </Button>
          </form>
          <div>
            <span>Already have account ?</span>
            <Button
              to={'/login'}
              className='ml-2 font-semibold hover:opacity-80'
            >
              Sign in
            </Button>
          </div>
          <div className='my-5 flex items-center'>
            <span className='h-px flex-1 bg-secondColor opacity-30'></span>
            <p className='px-3 font-semibold text-secondColor opacity-30'>or</p>
            <span className='h-px flex-1 bg-secondColor opacity-30'></span>
          </div>
          <Button className='flex w-full items-center justify-center gap-3 rounded-lg border px-3 py-4 font-semibold shadow'>
            <FcGoogle className='text-3xl' />
            <p>Continue with Google</p>
          </Button>
        </div>
      </section>
    </HelmetProvider>
  )
}

export default RegisterPage
