'use client'
import {Input} from '@nextui-org/react'
import {useSearchParams} from 'next/navigation'
import React, {useRef} from 'react'
import {SearchIcon} from './searchIcon'
import {searchSubmit} from '@/actions/search'

export const InputSearch = () => {
  const searchParams = useSearchParams()
  const term = searchParams.get('term')
  const inputRef = useRef(null as HTMLInputElement | null)

  return (
    <form action={searchSubmit} className="w-full">
      <Input
        label="Search"
        name="term"
        isClearable
        ref={inputRef}
        // onClear={() => handleReset()}
        radius="lg"
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60',
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focused=true]:bg-default-200/50',
            'dark:group-data-[focused=true]:bg-default/60',
            '!cursor-text',
          ],
        }}
        placeholder="Type to search..."
        defaultValue={term ?? ''}
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </form>
  )
}
