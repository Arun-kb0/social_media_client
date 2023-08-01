import {
    AUTH, LOCALSTORAGE_USER,
    LOGOUT_SUCCESS, LOGOUT_START, LOGOUT_FAILED, AUTH_START, AUTH_SUCCESS, AUTH_FAILED
} from '../../../constants/actionTypes'
import * as api from '../../../api/apiIndex'

export const socialAuth = (provider, data) => async (dispatch) => {
    dispatch({ type: AUTH_START })

    console.warn('socialAuth actions')

    try {
        // const result = data
        const token = data.credential
        const { status, data: { result } } = await api.socialAuth({ provider, data })
        console.warn(`status  ${status}`)
        console.log(result)
        if (!status === 200)
            throw new Error('login failed')
        dispatch({ type: AUTH_SUCCESS, payload: { result, token } })

    } catch (error) {
        console.log(error)
        dispatch({ type: AUTH_FAILED, payload: error.response.data })

    }
}


export const signIn = (formData) => async (dispatch) => {
    console.log('signIn')
    dispatch({ type: AUTH_START })

    try {
        const { status, data } = await api.signin(formData)
        console.log(data)
        if (!status === 200)
            throw new Error('login failed')
        dispatch({ type: AUTH_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: AUTH_FAILED, payload: error.response.data })
    }
}

export const signUp = (formData) => async (dispatch) => {
    console.log('signUp')
    dispatch({ type: AUTH_START })

    try {
        const { status, data } = await api.signup(formData)
        console.log(data)
        if (!status === 200)
            throw new Error('login failed')
        dispatch({ type: AUTH_SUCCESS, payload: data })

    } catch (error) {
        console.log(error)
        dispatch({ type: AUTH_FAILED, payload: error.response.data })
    }

}


export const logout = () => async (dispatch, getState) => {
    console.log('logout')
    const { userId } = getState().auth
    dispatch({ type: LOGOUT_START })
    try {
        const data = await api.logout(userId)
        const { status } = data
        console.log(data)
        if (status === 200)
            dispatch({ type: LOGOUT_SUCCESS, payload: null })
        else
            throw new Error({ status, data })
    } catch (error) {
        console.error(error);
        dispatch({ type: LOGOUT_FAILED, payload: error })
    }
}


export const getLocalStroageUser = () => (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    user
        ? dispatch({ type: LOCALSTORAGE_USER, payload: user })
        : dispatch({ type: LOCALSTORAGE_USER, payload: null })
}



