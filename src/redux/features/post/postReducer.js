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
            return {
                ...state,
                posts: action.payload.posts,
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