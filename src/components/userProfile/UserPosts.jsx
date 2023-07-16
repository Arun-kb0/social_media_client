import React from 'react'
import Post from '../posts/post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'

const UserPosts = () => {
    // ! display userposts
    const { userPosts,likedPostIds } = useSelector(state => state.post)
    const { username , userId } = useSelector(state => state.auth)

    return (
        <Box sx={{display:'flex' ,flexDirection:'column', maxHeight:'90vh' , overflowY:'scroll' ,padding:2}}>
            {userPosts?.map((post)=>(
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