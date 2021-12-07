import { combineReducers } from "redux";
import authReducer from "./isAuthenticated.js";



const rootReducer = combineReducers({
    isAuth: authReducer,
})


export default rootReducer