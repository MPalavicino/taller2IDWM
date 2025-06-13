"use client";
import {User} from "@/interfaces/User";
import { createContext, use, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";
import { stat } from "fs";

type AuthContextProps = {

    user: User | null;
    status: "authenticated" | "non-authenticated" | "loading";
    auth: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;


}
const authInitialState: AuthState = {
    status: "loading",
    user: null,
}
export const AuthContext = createContext({}as AuthContextProps);

export const AuthProvider = ({children}: any) => {
    const [state,dispatch] = useReducer(authReducer, authInitialState);
    const auth = (user: User) => {
        dispatch({type: "authenticate", payload: {user}});
    }
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({type: "logout"});
    }
    const updateUser = (user: User) => {
        dispatch({type: "updateUser", payload: {user}});
    }
    return(
        <AuthContext.Provider 
        value={{
            ...state,
            auth,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}