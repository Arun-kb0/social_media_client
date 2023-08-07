import { axios } from '../imports/other'

const API = axios.create({ baseURL: "http://localhost:3001" })


API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile')
    if (profile)
        req.headers.Authorization = `Bearer ${JSON.parse(profile)?.token}`
    return req
})


API.interceptors.response.use(null, (error) => {
    console.log(error.response?.data?.message)

    if (error.response.status === 401 &&
        error.response?.data?.message === 'token expiereded') {

        console.warn("axois intercepter", error.response?.data?.message)
        if (localStorage.getItem("profile")) {
            localStorage.clear()
            location.reload(true)
        }
    }
})



export const getPosts = (page, source) => API.get(`/posts?page=${page}`, { cancelToken: source.token })
export const createPost = (newPost) => API.post('/posts/', newPost)
export const deletePost = (postId) => API.delete(`/posts?postId=${postId}`)
export const editPost = (updatedPost) => API.patch(`/posts/`, { updatedPost })
export const likePost = ({ postId, username }) => API.post('/posts/like', { postId, username })
export const getLikePost = (postIds) => API.post('/posts/getliked', { postIds })

export const getUserPosted = () => API.get('/posts/userposts')

export const deleteComment = (data) => API.post('/posts/deleteComment', data)
export const commentPost = (comment) => API.post('/posts/comment', comment)
export const getComments = (postId) => API.get(`/posts/comment?postId=${postId}`)



export const signup = (formData) => API.post('/user/signup/', formData)
export const signin = (formData) => API.post('/user/signin/', formData)
export const socialAuth = (data) => API.post('/user/socialAuth/', data)
export const logoutUser = (userId) => API.post(`/user/logout?userId=${userId}`)

export const getNotifications = () => API.get('/user/notifications/')
export const removeAllNotifications = () => API.patch('/user/notifications/')
export const removeNotification = (data) => API.patch(`/user/RemoveNotification/`, data)

export const getUsers = (page) => API.get(`/user/users?page=${page}`)
export const unfollow = (followingId) => API.patch(`/user/unfollow?followingId=${followingId}`)
export const follow = (data) => API.post('/user/follow/', data)
export const getFollowing = () => API.get('/user/following')
export const getFollowers = () => API.get('/user/followers')

export const getMessages = (roomId) => API.get(`/chatreq/message?roomId=${roomId}`)
export const getChatUsers = () => API.get(`/chatreq`)

