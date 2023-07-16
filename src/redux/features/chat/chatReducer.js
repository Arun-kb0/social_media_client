import {
    CREATE_CHAT_FAILED, CREATE_CHAT_START, CREATE_CHAT_SUCCESS,
    GET_MESSAGES_FAILED, GET_MESSAGES_START, GET_MESSAGES_SUCCESS,
    RECIVE_MESSAGE_FAILED, RECIVE_MESSAGE_START, RECIVE_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILED, SEND_MESSAGE_START, SEND_MESSAGE_SUCCESS,
    GET_CHAT_USERS_FAILED, GET_CHAT_USERS_START, GET_CHAT_USERS_SUCCESS, CLEAR_CHAT_STATE,
} from "../../../constants/actionTypes"

const initialState = {
    messages: [],
    roomId: null,
    chatUser: null,
    chatUsers: [],
    loading: false,
    error: ''

}

const chatReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_CHAT_USERS_START:
            return {
                ...state,
                loading: true
            }
        case GET_CHAT_USERS_SUCCESS:
            return {
                ...state,
                chatUsers: action.payload,
                loading: false
            }
        case GET_CHAT_USERS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case CREATE_CHAT_START:
            return {
                ...state,
                loading: true
            }
        case CREATE_CHAT_SUCCESS:
            return {
                ...state,
                roomId: action.payload.roomId,
                chatUser: action.payload.chatUser,
                loading: false
            }
        case CREATE_CHAT_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }


        case SEND_MESSAGE_START:
            return {
                ...state,
                loading: true
            }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: state.messages
                    ? [...state.messages, action.payload]
                    : [action.payload],
                loading: false
            }
        case SEND_MESSAGE_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }


        case RECIVE_MESSAGE_START:
            return {
                ...state,
                loading: true,
            }
        case RECIVE_MESSAGE_SUCCESS:
        return {
                ...state,
                messages: state?.messages
                    ? [...state.messages, action.payload]
                    : [action.payload],
                loading: false,
            }
        case RECIVE_MESSAGE_FAILED:
            return {
                ...state,
                loading: false,
            }


        case GET_MESSAGES_START:
            return {
                ...state,
                loading: true,
            }
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.payload
            }
        case GET_MESSAGES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_CHAT_STATE:
            return initialState

        default:
            return state
    }
}


export default chatReducer