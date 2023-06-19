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


export const signup = (formData) => API.post('/user/signup/', formData)
export const signin = (formData) => API.post('/user/signin/', formData)
