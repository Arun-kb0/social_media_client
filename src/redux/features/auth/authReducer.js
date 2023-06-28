import { AUTH, LOGOUT, LOCALSTORAGE_USER } from '../../../constants/actionTypes'



const initialState = {
    authData: null,
    username: null,
    userId: null

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case AUTH:
            console.log('auth reducer')
            console.warn(action.payload)
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))

            return {
                ...state,
                authData: action.payload,
                userId: action.payload?.result?.sub || action.payload?.result?._id,
                username: action.payload?.result?.name
            }

        case LOGOUT:
            localStorage.removeItem('profile')
            return {
                ...state,
                authData: null,
                userId: null,
                username: null
            }

        case LOCALSTORAGE_USER:

            return {
                ...state,
                authData: action.payload,
                userId: action.payload?.result?.sub || action.payload?.result?._id,
                username: action.payload?.result?.name

            }

        default:
            return state
    }
}


export default authReducer

