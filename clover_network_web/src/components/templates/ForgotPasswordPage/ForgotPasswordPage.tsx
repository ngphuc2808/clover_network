import Button from '@/components/atoms/Button'
import { FacebookIcon, GithubIcon } from '@/components/atoms/Icons'
import { usePostLogin } from '@/hook'
import { useForm } from 'react-hook-form'
import { BiLoaderAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgotPasswordPage = () => {
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
    <section className='flex h-screen flex-col justify-between'>
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
            {loginApi.isLoading ? (
              <BiLoaderAlt className='animate-spin text-3xl' />
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </header>
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
                id='email'
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
        <div className='shadow-shadowPrimary my-10 w-[500px] max-w-[95%] rounded-xl bg-white sm:my-0'>
          <h1 className='p-5 text-2xl text-primaryColor'>Find Your Account</h1>
          <div className='flex items-center'>
            <span className='h-px flex-1 bg-secondColor opacity-30'></span>
          </div>
          <div className='p-5 text-lg text-textHeadingColor'>
            <h3>Please enter the otp code to confirm.</h3>
            <form>
              <input
                type='otp'
                id='otp'
                className='mt-5 w-full rounded-lg border border-thirdColor px-3 py-4 outline-none'
                placeholder='Otp code'
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
      {/* <div className='mt-[61px] flex flex-1 items-center justify-center bg-[#e9ebee]'>
        <div className='shadow-shadowPrimary my-10 w-[500px] max-w-[95%] rounded-xl bg-white sm:my-0'>
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
                placeholder='New password'
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
      <footer className='flex justify-center bg-white'>
        <div className='w-[1280px]  max-w-[95%] py-10'>
          <div className='items-center md:flex md:justify-between'>
            <div className='mb-6 md:mb-0'>
              <Button to={'/login'} className='flex items-center'>
                <figure className='w-28'>
                  <img src='../../logo.png' alt='' />
                </figure>
              </Button>
            </div>
            <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6'>
              <div>
                <h2 className='text-textHeadingColort mb-6 text-sm font-semibold uppercase'>
                  Resources
                </h2>
                <ul className='font-medium text-textPrimaryColor '>
                  <li className='mb-4'>
                    <a href='#' className='hover:underline'>
                      Clover
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className='text-textHeadingColort mb-6 text-sm font-semibold uppercase'>
                  Follow us
                </h2>
                <ul className='font-medium text-textPrimaryColor '>
                  <li className='mb-4'>
                    <a
                      href='https://github.com/lambmt2k/clover_network_web'
                      className='hover:underline '
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.facebook.com/Hoangphuc2808/'
                      className='hover:underline'
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className='text-textHeadingColort mb-6 text-sm font-semibold uppercase '>
                  Legal
                </h2>
                <ul className='font-medium text-textPrimaryColor '>
                  <li className='mb-4'>
                    <a href='#' className='hover:underline'>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:underline'>
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className='my-6 border-primaryColor/30 sm:mx-auto lg:my-8' />
          <div className='sm:flex sm:items-center sm:justify-between'>
            <span className='text-sm text-textPrimaryColor  sm:text-center'>
              © 2023{' '}
              <a href='#' className='hover:underline'>
                Clover
              </a>
              . All Rights Reserved.
            </span>
            <div className='mt-4 flex space-x-5 sm:mt-0 sm:justify-center'>
              <a
                href='https://www.facebook.com/Hoangphuc2808/'
                className='hover:text-textHeadingColort text-textPrimaryColor '
              >
                <FacebookIcon />
                <span className='sr-only'>Facebook page</span>
              </a>
              <a
                href='https://github.com/lambmt2k/clover_network_web'
                className='hover:text-textHeadingColort text-textPrimaryColor '
              >
                <GithubIcon />
                <span className='sr-only'>GitHub account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default ForgotPasswordPage
