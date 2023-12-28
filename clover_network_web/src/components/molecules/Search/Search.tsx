import { useRef, ChangeEvent } from 'react'

import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

interface iProps {
  title: string
  searchTerm: string
  isMobile?: boolean
  openSearch?: boolean
  setOpenSearch?: (openSearch: boolean) => void
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleClearChange: () => void
  loading?: boolean
}

const Search = ({
  title,
  searchTerm,
  isMobile,
  openSearch,
  setOpenSearch,
  handleSearchChange,
  handleClearChange,
  loading,
}: iProps) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
  return (
    <div
      onClick={() => isMobile && setOpenSearch && setOpenSearch(true)}
      className={`lg:basis-inherit flex h-[45px] ${
        isMobile ? 'mr-3 w-[45px]' : 'w-auto'
      } items-center ${openSearch ? 'w-auto' : ''}
      justify-between overflow-hidden rounded-full bg-bgPrimaryColor md:w-auto lg:mt-0 lg:w-auto`}
    >
      <span className='cursor-pointer p-3 text-2xl text-primaryColor hover:text-secondColor sm:px-3 sm:py-[5px]'>
        <HiOutlineMagnifyingGlass />
      </span>
      <input
        className='h-full flex-1 bg-transparent text-textPrimaryColor outline-none'
        ref={inputRef}
        type='text'
        placeholder={title}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className='flex items-center'>
        <span className={`animate-spin ${loading ? 'block' : 'hidden'}`}>
          <AiOutlineLoading3Quarters />
        </span>
        <span
          className={`cursor-pointer px-3 py-[5px] hover:text-warnColor ${
            searchTerm.length > 0 ? 'block' : 'hidden'
          }`}
          onClick={() => {
            handleClearChange()
            inputRef.current.focus()
          }}
        >
          <AiOutlineClose />
        </span>
      </div>
    </div>
  )
}

export default Search
