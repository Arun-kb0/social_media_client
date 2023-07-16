import {
    CLEAR_CHAT_STATE,
    CREATE_CHAT_FAILED, CREATE_CHAT_START, CREATE_CHAT_SUCCESS,
    GET_CHAT_USERS_FAILED, GET_CHAT_USERS_START, GET_CHAT_USERS_SUCCESS,
    GET_MESSAGES_FAILED, GET_MESSAGES_START, GET_MESSAGES_SUCCESS
    , RECIVE_MESSAGE_FAILED, RECIVE_MESSAGE_START, RECIVE_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILED, SEND_MESSAGE_START, SEND_MESSAGE_SUCCESS
} from "../../../constants/actionTypes"
import { v4 as uuid } from "uuid"
import * as api from '../../../api/apiIndex'
import { follow } from "../user/userActions"

export const createRoom = ({ socket, id, name, photo }) => async (dispatch, getState) => {
    dispatch({ type: CREATE_CHAT_START })
    const { userId } = getState().auth
    console.log(userId, id, socket)

    try {
        let roomId
        if (userId > id) {
            roomId = userId + id
        } else {
            roomId = id + userId
        }
        const data = {
            roomId,
            currentUserId: userId,
            chatUserId: id,
            chatUserName: name,
            chatUserPhoto: photo
        }
        await socket.emit("join_room", data)



        dispatch({
            type: CREATE_CHAT_SUCCESS, payload: {
                roomId,
                chatUser: { name, id, photo }
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: CREATE_CHAT_FAILED, payload: error })
    }
}


export const sendMessage = ({ socket, id, messageInput }) => async (dispatch, getState) => {
    dispatch({ type: SEND_MESSAGE_START })
    const { roomId } = getState().chat
    const { username, userId } = getState().auth
    try {
        const id = uuid()
        const messageData = {
            id,
            roomId,
            authorName: username,
            authorId: userId,
            message: messageInput,
            createdAt: new Date()
        }
        await socket?.emit("send_message", messageData)
        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: messageData })
    } catch (error) {
        console.log(error)
        dispatch({ type: SEND_MESSAGE_FAILED })
    }
}


export const reciveMessage = ({ socket }) => async (dispatch) => {

    dispatch({ type: RECIVE_MESSAGE_START })
    try {
        socket?.on("recive_message", (data) => {
            console.log("recive_message" , data)
            console.log(data)
            dispatch({ type: RECIVE_MESSAGE_SUCCESS, payload: data })
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: RECIVE_MESSAGE_FAILED, payload: error })

    }
}


export const getChatUsers = () => async (dispatch, getState) => {
    dispatch({ type: GET_CHAT_USERS_START })

    try {
        const { data: { following } } = await api.getFollowing() 
        const { data: { chatUsers } } = await api.getChatUsers()
        const lastMessageAddedList = following.map((user, i) => {
            const chatUser = chatUsers?.find(chatUser => chatUser.v.user.userId === user.id)
            if (chatUser) {
                return { ...user, lastMessage: chatUser.v.lastMessage }
            } else
                return user 
        })

        dispatch({ type: GET_CHAT_USERS_SUCCESS, payload: lastMessageAddedList })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_CHAT_USERS_FAILED, payload: error })
    }
}


export const getMessages = ({ id }) => async (dispatch, getState) => {
    const { userId } = getState().auth
    dispatch({ type: GET_MESSAGES_START })
    try {
        let roomId
        if (userId > id) {
            roomId = userId + id
        } else {
            roomId = id + userId
        }

        const { data:{data} } = await api.getMessages(roomId)
        console.log(data)
        // let messages
        // if (data) {
        //     messages = { [data?.roomId]: data?.messages }
        //     console.log(messages)
        // }

        dispatch({ type: GET_MESSAGES_SUCCESS, payload: data?.messages })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_MESSAGES_FAILED, payload: error })
    }
}


export const clearChatState = ()=> (dispatch)=>{
    dispatch({type:CLEAR_CHAT_STATE , payload:null})
}


