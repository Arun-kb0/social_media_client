import React from 'react'
import Post from '../posts/post/Post'
import { useSelector } from 'react-redux'
import { Box, Typography } from '../../imports/materialuiComponents'

const UserPosts = () => {
    const { userPosts, likedPostIds } = useSelector(state => state.post)
    const { username, userId } = useSelector(state => state.auth)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflowY: 'scroll', padding: 2 }}>
            {userPosts?.length === 0
                ? <Typography variant='h6'>No posts yet</Typography>
                : userPosts?.map((post) => (
                    <Post
                        key={post._id}
                        post={post}
                        likedPostIds={likedPostIds}
                        userId={userId}
                        username={username}
                    />
                ))}
        </Box>
    )
}

export default UserPosts