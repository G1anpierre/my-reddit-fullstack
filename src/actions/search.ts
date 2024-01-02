'use server'

import {redirect} from 'next/navigation'

export const searchSubmit = (formData: FormData) => {
  const searchTerm = formData.get('term')
  console.log('search Term', searchTerm)
  redirect(`/search?term=${searchTerm}`)
}
