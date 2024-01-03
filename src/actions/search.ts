'use server'

import {redirect} from 'next/navigation'

export const searchSubmit = (formData: FormData) => {
  const searchTerm = formData.get('term')
  redirect(`/search?term=${searchTerm}`)
}
