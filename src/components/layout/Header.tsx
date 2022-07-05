
import { List, UserCircle, X } from "phosphor-react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { LgAcosLabV2 } from "../logo/lg-acoslabv2"
import RocketSeatLabv1 from "../../assets/RocketSeatLabv1.png"

export const Header = () => {
    const { user, signin, menu, SignOut, showMenu } = useContext(AuthContext)
    return (
        <>
            {!signin ? (
                <header className="bg-gray-700 flex items-center justify-center py-4 border-b border-gray-600 w-full ">
                    {/* <a href="/event"> <LgAcosLabV2 /></a> */}
                    <img src={RocketSeatLabv1} alt="Logo Acos Lab" />
                </header>
            ) : (
                <header className="w-full bg-gray-700 flex items-center justify-between px-4 py-4  lg:border-b lg:border-gray-600 lg:mb-2 ">
                    <div className="text-gray-200 hidden lg:flex lg:flex-col lg:leading-none">
                        <span className="text-xs ">Bem vindo</span> <span className="font-bold text-sm leading-none">{user?.name || user?.user_metadata?.name}</span>
                    </div>
                    <a className="flex-1 flex justify-start lg:justify-center" href="/event"><img src={RocketSeatLabv1} alt="Logo Acos Lab" /></a>
                    <div >
                        {!menu ?
                            <button className=" flex justify-end  items-center gap-2 lg:hidden" onClick={() => { showMenu(true) }}><span>Aulas</span><List className="text-blue-500" size={32} /></button> : <button className="flex justify-end  items-center gap-2 lg:hidden" onClick={() => { showMenu(false) }} ><X className="text-blue-500" size={32} /></button>}
                        <button className="hidden text-sm items-center justify-end gap-2 lg:flex" onClick={() => { SignOut() }}>{user?.user_metadata?.avatar_url ? <><img src={user.user_metadata.avatar_url} className="w-[32px] rounded-full" /> Sair</> : <><UserCircle size={32} /> Sair</>} </button>
                    </div>
                </header>
            )}
        </>
    )   
}   