import { Link } from "react-router-dom"
import { LgAcosv4 } from "../logo/lg-acosv4"

export const Footer = () => {
    return (
        <div className="border-t border-gray-600 px-6 py-2 flex items-baseline justify-between">
            <div className="flex items-baseline gap-4">
                <a target={"_blank"} href="https://acos-services.vercel.app">
                    <LgAcosv4 />
                </a>
                <span className="text-xs text-gray-400 font-light">
                     Todos os direitos reservados
                </span>
            </div>
            <div className="text-xs text-gray-400 font-light hover:underline hover:text-green-500">
                <Link to="#">Politica de Privacidade</Link>
            </div>
        </div>
    )
}
