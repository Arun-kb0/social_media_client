import React from 'react'
import { useSelector } from 'react-redux'
import Posts from '../posts/posts'

const ViewSearch = () => {
    const { searchResult, currentPage, numberOfPages, postIds, likedPostIds } = useSelector(state => state.post)
    return (
        <Posts
            posts={searchResult}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            postIds={postIds}
            likedPostIds={likedPostIds}
        />
    )
}

export default ViewSearch