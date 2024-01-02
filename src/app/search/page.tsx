import PostList from '@/components/posts/post-list'
import {searchTerms} from '@/get-data'
import React from 'react'

type SearchPageProps = {
  searchParams: {term: string}
}

const SearchPage = ({searchParams}: SearchPageProps) => {
  return <PostList fetchData={() => searchTerms(searchParams.term)} />
}

export default SearchPage
