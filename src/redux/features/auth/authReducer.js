import {
    AUTH, LOCALSTORAGE_USER, 
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILED,
} from '../../../constants/actionTypes'



const initialState = {
    loading: false,
    error: null,
    authData: null,
    username: null,
    userId: null,
    photo: null,
    email: null,
    isOnline: false,
    allUsers: {
        users: [],
        currentUsersPage: null,
        numberOfPages: null,
    },
    following: [],
    followers: []
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
                userId: action.payload?.result?.id,
                username: action.payload?.result?.name,
                email: action.payload?.result?.email,
                photo: action.payload?.result?.picture,
                isOnline: action.payload?.result?.isOnline,
            }



        case LOCALSTORAGE_USER:
            return {
                ...state,
                authData: action.payload,
                userId: action.payload?.result?.id,
                username: action.payload?.result?.name,
                email: action.payload?.result?.email,
                photo: action.payload?.result?.picture,
                isOnline: action.payload?.result?.isOnline,
            }

        case LOGOUT_START:
            localStorage.clear('profile')
            return {
                ...state,
                loading:true
            }
        case LOGOUT_SUCCESS:
            localStorage.clear('profile')
            return initialState
        case LOGOUT_FAILED:
            return {
                ...state,
                error:action.payload,
                loading:false
            }


        default:
            return state
    }
}


export default authReducer

