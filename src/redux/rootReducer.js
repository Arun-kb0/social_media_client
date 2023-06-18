import { combineReducers } from "redux";
import postReducer from "./features/post/postReducer";
import authReducer from "./features/auth/authReducer";

export default combineReducers({
    post: postReducer,
    auth: authReducer,

})