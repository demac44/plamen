import { combineReducers } from "redux";
import themeReducer from "./theme.js";
import authReducer from "./isAuthenticated.js";



const rootReducer = combineReducers({
    isAuth: authReducer,
    themeReducer
})


export default rootReducer