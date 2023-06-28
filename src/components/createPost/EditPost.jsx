import React, { useEffect } from 'react'
import CreatePost from './CreatePost'
import { useLocation } from 'react-router-dom'

const EditPost = () => {
    const location = useLocation()

    return (
        <>
            <CreatePost 
            postToEdit={location.state?.post} 
            edit={true}
            />
        </>
    )
}

export default EditPost