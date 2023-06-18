import { AUTH, LOGOUT, LOCALSTORAGE_USER } from '../../../constants/actionTypes'
import { useNavigate } from 'react-router-dom'
import * as api from '../../../api/apiIndex'

export const socialAuth = (provider, data) => async (dispatch) => {
    console.warn('socialAuth actions')
    try {
        const result = data
        const token = data.credential
        dispatch({
            type: AUTH,
            payload: { result, token }
        })

    } catch (error) {
        console.log(error)
    }
}


export const signIn = (formData) => async (dispatch) => {
    console.log('signIn')
    try {
        const { data } = await api.signin(formData)
        dispatch({ type: AUTH, payload: data })
    } catch (error) {
        console.error(error)
    }

}



export const signUp = (formData) => async (dispatch) => {
    console.log('signUp')

    try {
        const { data } = await api.signup(formData)
        dispatch({ type: AUTH, payload: data })
    } catch (error) {
        console.error(error)
    }

}


export const logout = () => (dispatch) => {
    console.log('logout')
    try {
        dispatch({ type: LOGOUT, payload: null })
    } catch (error) {
        console.error(error);
    }
}


export const getLocalStroageUser = () => (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    user
        ? dispatch({ type: LOCALSTORAGE_USER, payload: user })
        : dispatch({ type: LOCALSTORAGE_USER, payload: null })

}

