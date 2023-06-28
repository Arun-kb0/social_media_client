import {
    GET_POST,
    DELETE_POST_FAILED, DELETE_POST_SUCCESS,
    EDIT_POST_FAILED, EDIT_POST_START, EDIT_POST_SUCCESS,
    LIKE_START, LIKE_SUCCESS, LIKE_FAILED,
    GET_LIKED_START, GET_LIKED_SUCCESS, GET_LIKED_FAILED,
    COMMENT_START, COMMENT_SUCCESS, COMMENT_FAILED, GET_COMMENT_START, GET_COMMENT_SUCCESS, GET_COMMENT_FAILED,
    CREATE_POST_START, CREATE_POST_SUCCESS, CREATE_POST_FAILED

} from "../../../constants/actionTypes";
import * as api from '../../../api/apiIndex'
import axios from "axios";



export const getPosts = (page) => async (dispatch) => {
    try {
        const source = axios.CancelToken.source()
        const { data } = await api.getPosts(page, source)

        dispatch({ type: GET_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}


export const createPost = (post) => async (dispatch) => {
    dispatch({ type: CREATE_POST_START })

    const tags = post.tags.replace(/\s/g, "").split(",")
    console.warn(post)
    console.log(tags)
    try {
        const { data: { message, newPost } } = await api.createPost({ ...post, tags })
        console.log(message)
        dispatch({ type: CREATE_POST_SUCCESS, payload: { message, newPost } })
    } catch (error) {
        console.log(error)
        dispatch({ type: CREATE_POST_FAILED, payload: { message } })
    }
}


export const deletePost = (postId) => async (dispatch) => {

    try {
        const res = await api.deletePost(postId)
        console.log(res.status)
        if (res.status === 200)
            dispatch({ type: DELETE_POST_SUCCESS, payload: postId })
        else
            dispatch({ type: DELETE_POST_FAILED })
    } catch (error) {
        console.log(error)
        dispatch({ type: DELETE_POST_FAILED })

    }
}


export const editPost = (updatedPost) => async (dispatch) => {
    dispatch({ type: EDIT_POST_START })

    try {
        console.log(updatedPost)
        const res = await api.editPost(updatedPost)
        console.log(res)
        if (res.status === 200)
            dispatch({ type: EDIT_POST_SUCCESS, payload: res.data.post })
        else
            throw new Error(res.message)
    } catch (error) {
        console.log(error)
        dispatch({ type: EDIT_POST_FAILED })

    }
}


export const likePost = (postId, username) => async (dispatch) => {
    dispatch({ type: LIKE_START })
    try {
        const { data: { likecount } } = await api.likePost({ postId, username })
        console.log(likecount)
        dispatch({
            type: LIKE_SUCCESS,
            payload: { likecount, postId }
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: LIKE_FAILED, payload: error })
    }
}


export const getLikedPosts = (postIds) => async (dispatch) => {
    dispatch({ type: GET_LIKED_START })
    // console.log(postIds)
    try {
        const { data } = await api.getLikePost(postIds)
        console.log(data)
        dispatch({ type: GET_LIKED_SUCCESS, payload: data.likedPosts })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_LIKED_FAILED })

    }
}



export const commentPost = (data) => async (dispatch) => {
    dispatch({ type: COMMENT_START })
    console.log('data ', data)
    try {
        const { data: { postedComment } } = await api.commentPost(data)
        console.log({ [postedComment._id]: postedComment })
        dispatch({ type: COMMENT_SUCCESS, payload: { commentedPostId: data.postId, comment: postedComment } })
    } catch (error) {
        console.log(error)
        dispatch({ type: COMMENT_FAILED, payload: error })
    }
}


export const getComments = (postId) => async (dispactch) => {
    dispactch({ type: GET_COMMENT_START })
    try {
        const { data: { _id, comments } } = await api.getComments(postId)
        const newPostComments = { [_id]: comments }
        console.log(newPostComments)
        dispactch({ type: GET_COMMENT_SUCCESS, payload: newPostComments })
    } catch (error) {
        console.log(error)
        dispactch({ type: GET_COMMENT_FAILED, payload: error })
    }
}