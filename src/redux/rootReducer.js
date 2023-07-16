import { combineReducers } from "redux";
import postReducer from "./features/post/postReducer";
import authReducer from "./features/auth/authReducer";
import buttonToggleReducer from "./features/buttonToggle/buttonToggleReducer";
import userReducer from "./features/user/userReducer";
import chatReducer from "./features/chat/chatReducer";

export default combineReducers({
    post: postReducer,
    auth: authReducer,
    user: userReducer,
    chat:chatReducer,

    buttonToggle: buttonToggleReducer,

})