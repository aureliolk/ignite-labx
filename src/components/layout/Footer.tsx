import { Link } from "react-router-dom"
import { LgAcosv4 } from "../logo/lg-acosv4"

export const Footer = () => {
    return (
        <div className="border-t border-gray-600 px-6 py-4 flex flex-col justify-center items-center lg:items-baseline  lg:flex-row lg:justify-between lg:p-2">
            <a target={"_blank"} href="https://acos-services.vercel.app">
                <LgAcosv4 />
            </a>
            <div className="w-full flex flex-1 items-baseline text-xs text-gray-400 font-light text-center justify-between mt-2 lg:mt-0 lg:pr-4">
                <span className="text-xs text-gray-400 font-light">
                    Todos os direitos reservados
                </span>
                <Link className="transition-all hover:underline hover:text-green-500" to="#">Politica de Privacidade</Link>
            </div>
        </div>
    )
}
