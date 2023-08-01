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
import { useEffect } from "react"

export const createRoom = ({ socket, id, name, photo }) => async (dispatch, getState) => {
    dispatch({ type: CREATE_CHAT_START })
    const { userId, username, photo: currentUserPhoto } = getState().auth
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
            currentUsername: username,
            currentUserPhoto,
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


export const sendMessage = ({ socket, id, messageInput }) => (dispatch, getState) => {
    dispatch({ type: SEND_MESSAGE_START })
    const { roomId, chatUser } = getState().chat
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
        socket?.emit("send_message", messageData)
        socket?.emit("sendNotification",
            {
                username: username,
                creatorId: chatUser.id,
                type: 'message',
            },
            () => {

            }
        )
        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: messageData })
    } catch (error) {
        console.log(error)
        dispatch({ type: SEND_MESSAGE_FAILED })
    }

}


export const reciveMessage = ({ socket }) => (dispatch, getState) => {

    dispatch({ type: RECIVE_MESSAGE_START })
    console.log(socket)

    const reciveMessageHandler = (data) => {
        // console.log(data)
        dispatch({ type: RECIVE_MESSAGE_SUCCESS, payload: data })
    }
    try {
        socket.on("recive_message", reciveMessageHandler)
        console.log(" recive_message on")

    } catch (error) {
        console.log(error)
        dispatch({ type: RECIVE_MESSAGE_FAILED, payload: error })
    }

    return () => {
        socket.off("recive_message", reciveMessageHandler)
        console.log("recive_message off")
    }

}



export const getChatUsers = () => async (dispatch, getState) => {
    dispatch({ type: GET_CHAT_USERS_START })
    const { userId } = getState().auth

    try {
        const { data: { following } } = await api.getFollowing()
        const { data: { chatUsers } } = await api.getChatUsers()

        console.log("chatUsers", chatUsers)
        console.log("following", following)

        const updatedList = chatUsers?.map(chatUser => {
            const user = following?.find(user => chatUser.v.user.userId === user.id)
            if (user) {
                return {
                    ...chatUser.v.user,
                    lastMessage: chatUser.v.lastMessage,
                    isOnline: user.isOnline
                }
            } else {
                return {
                    ...chatUser.v.user,
                    lastMessage: chatUser.v.lastMessage,
                }
            }
        })

        const onlineUsers = updatedList?.filter(user => user.isOnline === true && user.userId !== userId)

        dispatch({ type: GET_CHAT_USERS_SUCCESS, payload: { updatedList, onlineUsers } })
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

        const { data: { data } } = await api.getMessages(roomId)
        console.log(data)

        dispatch({ type: GET_MESSAGES_SUCCESS, payload: data?.messages })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_MESSAGES_FAILED, payload: error })
    }
}


export const clearChatState = () => (dispatch) => {
    dispatch({ type: CLEAR_CHAT_STATE, payload: null })
}


