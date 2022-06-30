
import { UserCircle } from "phosphor-react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { LgAcosLabV2 } from "../logo/lg-acoslabv2"

export const Header = () =>{
    const {user,signin,SignOut} = useContext(AuthContext)
    
    return(
        <>
        {!signin ? (
            <header className="bg-gray-700 flex items-center justify-center py-4 border-b border-gray-600 w-full">
            <a href="/event"> <LgAcosLabV2 /></a>
         </header>
        ):(
            <header className="bg-gray-700 flex items-center justify-between px-8 py-4 border-b border-gray-600 w-full">
           <div className="text-gray-200">
             <span>Bem vindo</span> <span className="font-bold">{user?.name || user?.user_metadata?.name}</span>
           </div>
           <a className="flex-1 flex items-center justify-center" href="/event"> <LgAcosLabV2 /></a>
           <div className="w-40">
            <button className="flex text-sm items-center justify-end w-full gap-2" onClick={()=>{SignOut()}}>{user?.user_metadata?.avatar_url ? <><img src={user.user_metadata.avatar_url} className="w-[32px] rounded-full"/> Sair</>  : <><UserCircle size={32}/> Sair</> } </button>
           </div>
        </header>
        )}
        </>
    )
}