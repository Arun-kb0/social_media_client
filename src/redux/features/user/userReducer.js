import {
    GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAILED,
    FOLLOW_START, FOLLOW_FAILED, FOLLOW_SUCCESS, GET_FOLLOWING_START, GET_FOLLOWING_SUCCESS, GET_NOTIFICATIONS_START, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILED, RECIVE_NOTIFICATION_SUCCESS, RECIVE_NOTIFICATION_FAILED, RECIVE_NOTIFICATION_START
} from '../../../constants/actionTypes'


const initialState = {
    loading: false,
    error: null,
    allUsers: {
        users: [],
        currentUsersPage: null,
        numberOfPages: null,
    },
    following: [],
    followers: [],
    notification: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_USERS_START:
            return {
                ...state,
                loading: true
            }

        case GET_USERS_SUCCESS:
            const uniqueUserIds = new Set(state.allUsers.users.map(user => user.id))
            const uniqueUsers = action.payload.users.filter(user => !uniqueUserIds.has(user.id))
            console.log(uniqueUsers)
            return {
                ...state,
                allUsers: {
                    users: [...state.allUsers.users, ...uniqueUsers],
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages
                },
                loading: false
            }

        case GET_USERS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }


        case FOLLOW_START:
            return {
                ...state,
                loading: true
            }
        case FOLLOW_SUCCESS:
            return {
                ...state,
                following: [action.payload, ...state.following],
                loading: false
            }
        case FOLLOW_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case GET_FOLLOWING_START:
            return {
                ...state,
                loading: true
            }

        case GET_FOLLOWING_SUCCESS:
            return {
                ...state,
                following: action.payload,
                loading: false
            }

        case GET_FOLLOWING_START:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

            
        case GET_NOTIFICATIONS_START:
            return {
                ...state,
                loading: true
            }
        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notification: action.payload,
                loading: false
            }
        case GET_NOTIFICATIONS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }


        case RECIVE_NOTIFICATION_START:
            return {
                ...state,
                loading: true
            }
        case RECIVE_NOTIFICATION_SUCCESS:
            const getUnique = () => {
                const unique = new Set([...state.notification, action.payload])
                return Array.from(unique)
            }
            return {
                ...state,
                notification: state.notification
                    ? getUnique()
                    : [action.payload],
                loading: false
            }
        case RECIVE_NOTIFICATION_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }


        default:
            return state
    }
}


export default userReducer