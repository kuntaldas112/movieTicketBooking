import { createContext } from "react"

export const userContext=createContext();
export const initialState={
    isLoggedIn:false,
    isAdmin:false,

}
export const LOGGED_IN_USER="LOGGED_IN_USER";
export const LOGGED_IN_ADMIN="LOGGED_IN_ADMIN";
export const LOGGED_OUT="LOGGED_OUT";
export const reducer=(state,action)=>{
switch(action.type){
    case LOGGED_IN_USER:
        return {
           isLoggedIn:true,
           isAdmin:false
        }
    case LOGGED_IN_ADMIN:
        return {
            isLoggedIn:true,
            isAdmin:true
        }
    case LOGGED_OUT:{
        return {
            isLoggedIn:false,
            isAdmin:false,
        }
    }
    default: return state;
}
}