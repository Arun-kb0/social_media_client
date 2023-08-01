import {
    GET_POST,
    DELETE_POST_FAILED, DELETE_POST_SUCCESS,
    EDIT_POST_FAILED, EDIT_POST_START, EDIT_POST_SUCCESS,
    LIKE_START, LIKE_SUCCESS, LIKE_FAILED,
    GET_LIKED_START, GET_LIKED_SUCCESS, GET_LIKED_FAILED,
    COMMENT_START, COMMENT_SUCCESS, COMMENT_FAILED, GET_COMMENT_START, GET_COMMENT_SUCCESS, GET_COMMENT_FAILED,
    CREATE_POST_START, CREATE_POST_SUCCESS, CREATE_POST_FAILED,
    GET_USER_POST_START, GET_USER_POST_SUCCESS, GET_USER_POST_FAILED, RELAM_CONNECT_START, RELAM_CONNECT_SUCCESS, RELAM_CONNECT_FAILED, GET_SEARCH_START, GET_SEARCH_SUCCESS, GET_SEARCH_FAILED, DELETE_COMMENT_START, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILED

} from "../../../constants/actionTypes";
import * as api from '../../../api/apiIndex'
import axios from "axios";

import * as Relam from 'realm-web'

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
    // console.warn(post)
    // console.log(tags)
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



export const likePostListener = ({ postId, username, creatorId }) => (dispatch, getState) => {
    const { userId } = getState().auth
    const { socket } = getState().socketioReducer

    dispatch({ type: LIKE_START })
    console.log("like listener on")
    console.log(postId, username, creatorId)

    let likecount
    const likeHandler = (data) => {
        console.log(data)
        likecount = data.likecount
        if (creatorId !== userId)
            socket.emit("sendNotification",
                { postId, username, creatorId, type: 'liked', }
            )
    }

    const disLikeHandler = (data) => {
        console.log(data)
        likecount = data.likecount
    }

    const LikeFailedHandler = (error) => {
        socket.off("likePostFailedRes", LikeFailedHandler)
        throw new Error({ message: 'like failed ', error })
    }

    try {
        socket.on("postLiked", likeHandler)
        socket.on("postDisliked", disLikeHandler)
        socket.on("likePostFailedRes", LikeFailedHandler)

        dispatch({ type: LIKE_SUCCESS, payload: { likecount, postId } })

    } catch (error) {
        console.log(error)
        dispatch({ type: LIKE_FAILED, payload: error })
    }

    return () => {
        console.log("like listener off")
        socket.off("postLiked", likeHandler)
        socket.off("postDisliked", disLikeHandler)
        socket.off("likePostFailedRes", LikeFailedHandler)
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




export const commentPostListener = (creatorId) => (dispatch, getState) => {
    dispatch({ type: COMMENT_START })
    const { socket } = getState().socketioReducer
    const { userId } = getState().auth
    const handleComment = (data) => {
        console.log("commentPostSuccess on")
        console.log(" creatorId ", creatorId)
        const { postedComment, postId } = data
        console.log(postedComment, postId)

        if (creatorId !== userId)

            socket.emit("sendNotification",
                {
                    postId,
                    username: postedComment.username,
                    creatorId,
                    type: 'commented',
                }
            )

        dispatch({ type: COMMENT_SUCCESS, payload: { commentedPostId: postId, comment: postedComment } })
    }

    const handleCommentFailed = (data) => {
        throw new Error('comment failed')
    }

    try {
        socket.on("commentPostSuccess", handleComment)
        socket.on("commentPostFailed", handleCommentFailed)
    } catch (error) {
        console.log(error)
        dispatch({ type: COMMENT_FAILED, payload: error })
    }

    return () => {
        console.log("commentPostSuccess off")
        socket?.off("commentPostSuccess", handleComment)
        socket?.off("commentPostFailed", handleCommentFailed)
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


export const getUserPosted = () => async (dispatch) => {
    dispatch({ type: GET_USER_POST_START })
    try {
        const { data: { userPosts } } = await api.getUserPosted()
        console.log(userPosts);
        dispatch({ type: GET_USER_POST_SUCCESS, payload: userPosts })

    } catch (error) {
        console.log(error)
        dispatch({ type: GET_USER_POST_FAILED, payload: error })
    }
}


export const mongodbRelemConnect = () => async (dispatch) => {

    dispatch({ type: RELAM_CONNECT_START })
    try {
        const RELAM_APP_ID = "socialmedia-racyh"
        const app = new Relam.App({ id: RELAM_APP_ID })
        const credentials = Relam.Credentials.anonymous()
        const relamUser = await app.logIn(credentials)

        dispatch({ type: RELAM_CONNECT_SUCCESS, payload: relamUser })
    } catch (error) {
        console.log(error)
        dispatch({ type: RELAM_CONNECT_FAILED, payload: error })
    }
}

export const searchPost = (searchInput) => async (dispatch, getState) => {
    dispatch({ type: GET_SEARCH_START })
    const { mongodbRelam } = getState().post
    try {
        const searchRes = await mongodbRelam.functions.searchPosts(searchInput)
        console.log(searchRes)
        dispatch({ type: GET_SEARCH_SUCCESS, payload: searchRes })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_SEARCH_FAILED })
    }
}



export const deleteComment = ({ postId, creatorId, commentId, commentedUserId }) => async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_START })
    try {
        const { status, data } = await api.deleteComment({ postId, creatorId, commentId, commentedUserId })
        if (status !== 200) throw new Error('delete comment failed')
        console.log(status, data)
        dispatch({ type: DELETE_COMMENT_SUCCESS, payload: { deletedCommentPostId: postId, commentId } })
    } catch (error) {
        console.log(error)
        dispatch({ type: DELETE_COMMENT_FAILED, payload: error })
    }
}