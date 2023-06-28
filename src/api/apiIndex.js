import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:3001" })

API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile')
    if (profile)
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
    return req
})

export const getPosts = (page, source) => API.get(`/posts?page=${page}`, { cancelToken: source.token })
export const createPost = (newPost) => API.post('/posts/', newPost)
export const deletePost = (postId) => API.delete(`/posts?postId=${postId}`)
export const editPost = (updatedPost) => API.patch(`/posts/`, { updatedPost })
export const likePost = ({ postId, username }) => API.post('/posts/like', { postId, username })
export const getLikePost = (postIds) => API.post('/posts/getliked',{postIds}  )

export const commentPost = (comment)=> API.post('/posts/comment',comment )
export const getComments = (postId)=> API.get(`/posts/comment?postId=${postId}` )

export const signup = (formData) => API.post('/user/signup/', formData)
export const signin = (formData) => API.post('/user/signin/', formData)
