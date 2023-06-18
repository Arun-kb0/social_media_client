import { 
    CREATE_POST,GET_POST
} from "../../../constants/actionTypes";
import * as api from '../../../api/apiIndex'



export const getPosts = ()=> async (dispatch)=>{
    try {
        const { data } = await api.getPosts() 
        console.log('getPosts success')
        dispatch({type:GET_POST , payload:data})
    } catch (error) {
        console.log(error)
    }
}



export const createPost = (post) => async (dispatch) => {
    
    const tags = post.tags.replace(/\s/g,"").split(",")
    console.warn(post)
    console.log(tags)
    try {
        await api.createPost({...post ,tags })
        console.log('post success ')
    } catch (error) {
        console.log(error)
    }
    dispatch({
        type: CREATE_POST,
        payload: null
    })
}