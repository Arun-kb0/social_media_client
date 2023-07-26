import { RECIVE_NOTIFICATION_FAILED, RECIVE_NOTIFICATION_START, RECIVE_NOTIFICATION_SUCCESS, SOCKET_CONNECT_FAILED, SOCKET_CONNECT_START, SOCKET_CONNECT_SUCCESS, SOCKET_DISCONNECT_FAILED, SOCKET_DISCONNECT_START, SOCKET_DISCONNECT_SUCCESS } from "../../../constants/actionTypes";


const initialState = {
    socket: null,
    loading: false,
    error: null
}


const socketioReducer = (state = initialState, action) => {

    switch (action.type) {
        case SOCKET_CONNECT_START:
            return {
                ...state,
                loading: true
            }
        case SOCKET_CONNECT_SUCCESS:
            return {
                ...state,
                socket: action.payload,
                loading: false
            }
        case SOCKET_CONNECT_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case SOCKET_DISCONNECT_START:
            return {
                ...state,
                loading: true
            }
        case SOCKET_DISCONNECT_SUCCESS:
            return {
                ...state,
                socket: null,
                loading: false
            }
        case SOCKET_DISCONNECT_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }



        default:
            return state;
    }
}


export default socketioReducer
