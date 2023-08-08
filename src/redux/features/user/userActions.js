import {
    GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAILED,
    FOLLOW_START, FOLLOW_FAILED, FOLLOW_SUCCESS,
    GET_FOLLOWING_FAILED, GET_FOLLOWING_START, GET_FOLLOWING_SUCCESS,
    GET_NOTIFICATIONS_START, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILED,
    RECIVE_NOTIFICATION_START, RECIVE_NOTIFICATION_SUCCESS, RECIVE_NOTIFICATION_FAILED,
    REMOVE_ALL_NOTIFICATIONS_START, REMOVE_ALL_NOTIFICATIONS_SUCCESS, REMOVE_ALL_NOTIFICATIONS_FAILED,
    GET_MSG_NOTIFICATIONS_SUCCESS,REMOVE_NOTIFICATION_START, REMOVE_NOTIFICATION_SUCCESS, REMOVE_MSG_NOTIFICATIONS_SUCCESS,
    UNFOLLOW_START, UNFOLLOW_SUCCESS, UNFOLLOW_FAILED,
    GET_FOLLOWERS_START, GET_FOLLOWERS_SUCCESS, GET_FOLLOWERS_FAILED,
} from '../../../constants/actionTypes'
import * as api from '../../../api/apiIndex'


export const getUsers = (page) => async (dispatch, getState) => {
    dispatch({ type: GET_USERS_START })
    const { userId } = getState().auth
    const { following } = getState().user
    console.log("userId", userId)
    try {
        const { data } = await api.getUsers(page)
        console.log(data)
        const followingUserIds = following?.map(user => user.id)
        const filteredData = data.users?.filter((user) => !followingUserIds?.includes(user.id) && user.id !== userId)
        data.users = filteredData
        dispatch({ type: GET_USERS_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_USERS_FAILED, payload: error })
    }
}


export const follow = (followData) => async (dispatch) => {
    dispatch({ type: FOLLOW_START })
    try {
        const { data: { following } } = await api.follow(followData)
        console.log(following)
        dispatch({ type: FOLLOW_SUCCESS, payload: following })
    } catch (error) {
        console.log(error)
        dispatch({ type: FOLLOW_FAILED, payload: error })
    }
}

export const unFollow = (followingId) => async (dispatch) => {
    dispatch({ type: UNFOLLOW_START })
    try {
        const data = await api.unfollow(followingId)
        console.log(data)
        if (data.status === 200)
            dispatch({ type: UNFOLLOW_SUCCESS, payload: followingId })
        else
            throw new Error(data.error)
    } catch (error) {
        console.log(error)
        dispatch({ type: UNFOLLOW_FAILED, payload: error })
    }
}

export const getFollowing = () => async (dispacth) => {
    dispacth({ type: GET_FOLLOWING_START })
    try {
        const { data: { following } } = await api.getFollowing()
        console.log(following)
        dispacth({ type: GET_FOLLOWING_SUCCESS, payload: following })
    } catch (error) {
        console.log(error)
        dispacth({ type: GET_FOLLOWING_FAILED, payload: error })
    }
}


export const getFollowers = () => async (dispatch) => {
    dispatch({type:GET_FOLLOWERS_START})
    try {
        const { data: { followers }  } = await api.getFollowers()
        console.log(followers)
        dispatch({type:GET_FOLLOWERS_SUCCESS , payload:followers})
    } catch (error) {
        console.log(error)
        dispatch({type:GET_FOLLOWERS_FAILED , payload:error})
    }

}


export const getAllNotifications = () => async (dispatch,) => {
    dispatch({ type: GET_NOTIFICATIONS_START })
    try {
        const { data: { data } } = await api.getNotifications()
        console.log(data)
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_NOTIFICATIONS_FAILED, payload: error })
    }
}




export const ReciveNotifications = () => (dispatch, getState) => {
    dispatch({ type: RECIVE_NOTIFICATION_START })
    const { socket } = getState().socketioReducer

    const onHandleNotification = (data) => {

        console.log(data)
        if (data?.newNotification?.newMessageNotification?.actionType === 'message') {
            const { newNotification: { newMessageNotification, totalMessageCount } } = data
            dispatch({
                type: GET_MSG_NOTIFICATIONS_SUCCESS,
                payload: {
                    newMessageNotification,
                    totalMessageCount
                }
            })
        } else {
            dispatch({ type: RECIVE_NOTIFICATION_SUCCESS, payload: data?.newNotification })
        }
        console.log("postLikeNotification on")
    }


    try {
        socket.on("getNotification", onHandleNotification)
    } catch (error) {
        console.log(error)
        dispatch({ type: RECIVE_NOTIFICATION_FAILED, payload: error })
    }

    return () => {
        console.log("postLikeNotification off")
        socket?.off("getNotification", onHandleNotification)
    }
}


export const removeAllNotifications = () => async (dispatch, getState) => {
    dispatch({ type: REMOVE_ALL_NOTIFICATIONS_START })
    try {
        const data = await api.removeAllNotifications()
        dispatch({ type: REMOVE_ALL_NOTIFICATIONS_SUCCESS })
    } catch (error) {
        dispatch({ type: REMOVE_ALL_NOTIFICATIONS_FAILED, payload: error })
    }
}

export const removeNotification = (notificationId, type) => async (dispatch) => {
    dispatch({ type: REMOVE_NOTIFICATION_START })
    try {
        const data = await api.removeNotification({ notificationId, type })
        type === 'message'
            ? dispatch({ type: REMOVE_MSG_NOTIFICATIONS_SUCCESS, payload: notificationId })
            : dispatch({ type: REMOVE_NOTIFICATION_SUCCESS, payload: notificationId })
    } catch (error) {
        console.log(error)
        dispatch({ type: REMOVE_NOTIFICATION_START, payload: error })
    }
}

