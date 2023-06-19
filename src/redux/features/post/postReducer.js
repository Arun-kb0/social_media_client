import { CREATE_POST, GET_POST } from "../../../constants/actionTypes";

const initialState = {
    posts: [],
    currentPage: null,
    numberOfPages: null,
    loading: false,

}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST:
            console.log(action.payload)
            const uniquePostIds = new Set(state.posts.map(post => post._id))
            const uniquePosts = action?.payload.posts?.filter(
                post => !uniquePostIds.has(post._id)
            )
            return {
                ...state,
                posts: [...state.posts, ...uniquePosts],
                // posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }

        case CREATE_POST:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default postReducer