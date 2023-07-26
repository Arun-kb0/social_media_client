import io from 'socket.io-client'
import { RECIVE_NOTIFICATION_FAILED, RECIVE_NOTIFICATION_START, RECIVE_NOTIFICATION_SUCCESS, SOCKET_CONNECT_FAILED, SOCKET_CONNECT_START, SOCKET_CONNECT_SUCCESS, SOCKET_DISCONNECT_FAILED, SOCKET_DISCONNECT_START, SOCKET_DISCONNECT_SUCCESS } from '../../../constants/actionTypes'


export const socketConnect = () => (dispatch, getState) => {
    dispatch({ type: SOCKET_CONNECT_START })
    const { authData } = getState().auth
    try {
        const socket = io.connect('http://localhost:3001', {
            extraHeaders: { Authorization: `Bearer ${authData?.token}` }
        })
        dispatch({ type: SOCKET_CONNECT_SUCCESS, payload: socket })
    } catch (error) {
        console.log(error)
        dispatch({ type: SOCKET_CONNECT_FAILED })
    }
}


export const socketDisConnect = () => (dispatch, getState) => {
    dispatch({ type: SOCKET_DISCONNECT_START })
    const { socket } = getState().socketioReducer

    try {
        socket.disconnect()
        dispatch({ type: SOCKET_DISCONNECT_SUCCESS })
    } catch (error) {
        console.log(error)
        dispatch({ type: SOCKET_DISCONNECT_FAILED })
    }
}



