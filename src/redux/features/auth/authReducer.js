import { AUTH, LOGOUT, LOCALSTORAGE_USER } from '../../../constants/actionTypes'



const initialState = {
    authData: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case AUTH:
            console.log('auth reducer')
            console.warn(action.payload)

            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            return {
                ...state,
                authData: action.payload
            }

        case LOGOUT:
            localStorage.removeItem('profile')
            return {
                ...state,
                authData: null
            }

        case LOCALSTORAGE_USER:
            return {
                ...state,
                authData: action.payload
            }

        default:
            return state
    }
}


export default authReducer

