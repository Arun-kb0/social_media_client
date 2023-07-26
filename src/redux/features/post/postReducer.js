import {
    GET_POST,
    DELETE_POST_FAILED, DELETE_POST_SUCCESS, DELETE_POST_START,
    EDIT_POST_FAILED, EDIT_POST_START, EDIT_POST_SUCCESS,
    LIKE_START, LIKE_SUCCESS, LIKE_FAILED,
    GET_LIKED_FAILED, GET_LIKED_SUCCESS, GET_LIKED_START,
    COMMENT_START, COMMENT_SUCCESS, COMMENT_FAILED,
    GET_COMMENT_START, GET_COMMENT_SUCCESS, GET_COMMENT_FAILED,
    CREATE_POST_START, CREATE_POST_SUCCESS, CREATE_POST_FAILED,
    GET_USER_POST_START, GET_USER_POST_SUCCESS, GET_USER_POST_FAILED


} from "../../../constants/actionTypes";

const initialState = {
    posts: [],
    postIds: [],
    likedPostIds: [],
    postComments: {},
    userPosts: [],
    currentPage: null,
    numberOfPages: null,
    loading: false,
    error: null,
    message: null,
    isMessage: false,

    isNotificationSend: false
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_POST:
            // console.log(action.payload)
            const uniquePostIds = new Set(state.posts.map(post => post._id))
            const uniquePosts = action?.payload.posts?.filter(
                post => !uniquePostIds.has(post._id)
            )
            console.log(uniquePostIds)

            return {
                ...state,
                posts: [...state.posts, ...uniquePosts],
                postIds: [...uniquePostIds],
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }

        case CREATE_POST_START:
            return {
                ...state,
                loading: true
            }
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                posts: [action.payload.newPost, ...state.posts],
                isMessage: !state.isMessage,
                loading: false,
            }
        case CREATE_POST_FAILED:
            return {
                ...state,
                message: action.payload.message,
                loading: false
            }



        case DELETE_POST_START:
            return {
                ...state,
                loading: true
            }
        case DELETE_POST_SUCCESS:
            const updatedPosts = state.posts.filter(
                (post) => post._id !== action.payload
            )
            return {
                ...state,
                posts: updatedPosts,
                loading: false

            }
        case DELETE_POST_FAILED:
            return {
                ...state,
                loading: false
            }


        case EDIT_POST_START:
            return {
                ...state,
                loading: true
            }
        case EDIT_POST_SUCCESS:
            const post = state.posts.filter(
                (post) => post._id !== action.payload._id
            )
            console.log(action.payload._id)
            return {
                ...state,
                posts: [...post, action.payload],
                loading: false
            }
        case EDIT_POST_FAILED:
            return {
                ...state,
                loading: false
            }


        case LIKE_START:
            return {
                ...state,
                loading: true
            }
        case LIKE_SUCCESS:
            const { likecount, postId } = action.payload
            const updatedPost = state.posts.map(post => {
                if (postId === post._id)
                    return { ...post, like_count: likecount }
                return post
            })
            return {
                ...state,
                posts: updatedPost,
                isNotificationSend: action.payload.notificationSend,
                loading: false
            }
        case LIKE_FAILED:
            return {
                ...state,
                loading: false
            }


        case GET_LIKED_START:
            return {
                ...state,
                loading: true
            }
        case GET_LIKED_SUCCESS:
            return {
                ...state,
                likedPostIds: action.payload,
                loading: false
            }
        case GET_LIKED_FAILED:
            return {
                ...state,
                loading: false
            }

        case COMMENT_START:
            return {
                ...state,
                loading: true
            }
        case COMMENT_SUCCESS:
            const { commentedPostId, comment } = action.payload
            const updatedComments = [comment, ...state?.postComments[commentedPostId]]

            return {
                ...state,
                postComments: {
                    ...state.postComments,
                    [commentedPostId]: updatedComments
                },
                loading: false
                // postComments[commentedPostId]:updatedComments


            }
        case COMMENT_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }



        case GET_COMMENT_START:
            return {
                ...state,
                loading: true
            }
        case GET_COMMENT_SUCCESS:
            return {
                ...state,
                postComments: { ...state.postComments, ...action.payload },
                loading: false
            }

        case GET_COMMENT_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }


        case GET_USER_POST_START:
            return {
                ...state,
                loading: true
            }
        case GET_USER_POST_SUCCESS:
            return {
                ...state,
                userPosts: action.payload,
                loading: false
            }
        case GET_USER_POST_FAILED:
            return {
                ...state,
                loading: false
            }


        default:
            return state
    }
}

export default postReducer