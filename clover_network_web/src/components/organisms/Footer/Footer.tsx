import Button from '@/components/atoms/Button'
import { FacebookIcon, GithubIcon } from '@/components/atoms/Icons'

interface iProps {
  className?: string
}

const Footer = ({ className }: iProps) => {
  return (
    <footer className={`flex justify-center bg-white ${className}`}>
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
            © 2023&nbsp;
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
  )
}

export default Footer
