import { createContext, useState } from "react";
import { ChildrenProps } from "../components/Layout";

interface UserProps {
    name: string
    id: string
}


interface AuthContextProps {
    user: UserProps | null
    signin: boolean
    SignOut: ()=>void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({children}: ChildrenProps)=>{
    const [user, setUser] = useState<UserProps | null>(JSON.parse(localStorage.getItem("user") as string))
    const signin = !!user

    function SignOut(){
        localStorage.removeItem("user")
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, signin, SignOut}}>
            {children}
        </AuthContext.Provider>
    )
}