import { useRef, ChangeEvent } from 'react'

import { AiOutlineClose } from 'react-icons/ai'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

interface Props {
  title: string
  searchTerm: string
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleClearChange: () => void
}

const Search = ({
  title,
  searchTerm,
  handleSearchChange,
  handleClearChange,
}: Props) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  return (
    <div
      className={`lg:basis-inherit bg-bgPrimaryColor order-3 mt-4 flex h-[35px] w-full
      items-center justify-between overflow-hidden rounded-full md:w-[223px] lg:order-none lg:mt-0 lg:w-[500px]`}
    >
      <span className='cursor-pointer px-3 py-[5px] text-xl text-primaryColor hover:text-secondColor'>
        <HiOutlineMagnifyingGlass />
      </span>
      <input
        className='h-full flex-1 bg-transparent text-sm text-textPrimaryColor outline-none'
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
