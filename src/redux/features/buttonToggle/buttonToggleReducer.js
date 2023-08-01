import {
    SET_FIND_PEOPLE_OPEN, SET_POSTS_OPEN,
    SET_FOLLOWING_OPEN,
    SET_SEARCH_OPEN
} from "../../../constants/actionTypes";

const initialState = {
    isPostsOpen: true,
    isFindPeopleOpen: false,
    isFollowOpen: false,
    isSearchOpen:false
}


const buttonToggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FIND_PEOPLE_OPEN:
            return {
                ...state,
                isPostsOpen: false,
                isFollowOpen: false,
                isSearchOpen:false,
                isFindPeopleOpen: action.payload
            }

        case SET_POSTS_OPEN:
            return {
                ...state,
                isFindPeopleOpen: false,
                isFollowOpen: false,
                isSearchOpen:false,
                isPostsOpen: action.payload,
            }
        case SET_FOLLOWING_OPEN:
            return {
                ...state,
                isFindPeopleOpen: false,
                isPostsOpen: false,
                isSearchOpen:false,
                isFollowOpen: action.payload,
            }
        case SET_SEARCH_OPEN:
            return{
                ...state,
                isFindPeopleOpen: false,
                isPostsOpen: false,
                isFollowOpen: false,
                isSearchOpen: action.payload
            }

        default:
            return {
                ...state
            };
    }
}

export default buttonToggleReducer