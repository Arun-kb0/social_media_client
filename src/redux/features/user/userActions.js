
import {
    GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAILED,
    FOLLOW_START, FOLLOW_FAILED, FOLLOW_SUCCESS, GET_FOLLOWING_FAILED, GET_FOLLOWING_START, GET_FOLLOWING_SUCCESS
} from '../../../constants/actionTypes'
import * as api from '../../../api/apiIndex'


export const getUsers = (page) => async (dispatch) => {
    dispatch({ type: GET_USERS_START })
    try {
        const { data } = await api.getUsers(page)
        console.log(data)
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