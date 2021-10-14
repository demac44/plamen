import loggedReducer from "./isLogged.js";
import { combineReducers } from "redux";



const rootReducer = combineReducers({
    isLogged: loggedReducer
})


export default rootReducer