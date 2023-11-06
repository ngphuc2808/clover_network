import { useRef, ChangeEvent, useState, useEffect } from 'react'

import { AiOutlineClose } from 'react-icons/ai'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

interface Props {
  title: string
  searchTerm: string
  isMobile: boolean
  search: boolean
  setOpenSearch: (search: boolean) => void
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleClearChange: () => void
}

const Search = ({
  title,
  searchTerm,
  isMobile,
  search,
  setOpenSearch,
  handleSearchChange,
  handleClearChange,
}: Props) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  return (
    <div
      onClick={() => isMobile && setOpenSearch(true)}
      className={`lg:basis-inherit flex h-[45px] w-[45px] items-center ${
        isMobile && search ? 'mr-3 flex-1' : ''
      }
      justify-between overflow-hidden rounded-full bg-bgPrimaryColor md:w-[275px] lg:mt-0 lg:w-[500px]`}
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
