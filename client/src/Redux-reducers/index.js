import authReducer from "./isAuthenticated.js";
import { combineReducers } from "redux";



const rootReducer = combineReducers({
    isAuth: authReducer
})


export default rootReducer