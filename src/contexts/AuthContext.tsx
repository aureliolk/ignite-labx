
import { createContext, useEffect, useState } from "react";
import { ChildrenProps } from "../components/Layout";
import { useCreateSubscribeMutation } from "../graphql/generated";
import { supabase } from "../lib/supbase";

interface UserProps {
    name?: string
    id: string
    email?:string
    user_metadata?: {
        avatar_url?: string
        name?: string
        email?: string 
    }
    aud?:string
}


interface AuthContextProps {
    user: UserProps | null
    signin: boolean
    SignOut: () => void
    signInWithGithub: () => void
    setUser: (data: UserProps | null) => void
    menu: boolean
    showMenu: (data:boolean)=>void

}

export const AuthContext = createContext({} as AuthContextProps)

export  const AuthProvider = ({ children }: ChildrenProps) => {
    const [user, setUser] = useState<UserProps | null>(JSON.parse(localStorage.getItem("user") as string))
    const[menu, showMenu] = useState<boolean>(false)
    const [createSubscribe] = useCreateSubscribeMutation()
    const signin = !!user

    useEffect(() => {
        /* when the app loads, check to see if the user is signed in */
        checkUser();
        /* check user on OAuth redirect */
        window.addEventListener('hashchange', function () {
            checkUser();
        });

    }, [])

    async function checkUser() {
        /* if a user is signed in, update local state */
        const user = supabase.auth.user();
        setUser(user);
        !user && setUser(JSON.parse(localStorage.getItem("user") as string))
    }
    async function signInWithGithub() {
        /* authenticate with GitHub */
        await supabase.auth.signIn({
            provider: 'github'
        })
    }

    async function SignOut() {
        localStorage.removeItem("user")
        await supabase.auth.signOut();
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signin, menu, showMenu, setUser, SignOut, signInWithGithub }}>
            {children}
        </AuthContext.Provider>
    )
}
