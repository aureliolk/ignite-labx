import { LgAcosLabV2 } from "../logo/lg-acoslabv2"

export const Header = () =>{
    return(
        <header className="bg-gray-700 flex items-center justify-center py-4 border-b border-gray-600 w-full">
           <a href="/event"> <LgAcosLabV2 /></a>
        </header>
    )
}