import { FileArrowDown } from "phosphor-react"

export const Material = () => {
    return (
        <div className="flex flex-col p-4 bg-gray-700 lg:gap-4 lg:px-4 lg:py-2 border-t border-gray-500 ">
            <a href="#" className="flex items-center gap-4 group hover:bg-gray-600 bg-gray-700 h-20">
                <div className="flex flex-col flex-1 p-2 ">
                    <span className="font-bold text-base text-gray-200">Material Complementar</span>
                    <span className="text-xs text-gray-300">Acesse o material complementar para acelerar o seu desenvolvimento</span>
                </div>
                <div className="bg-green-500 w-12 flex items-center justify-center h-full">
                    <FileArrowDown size={24} />
                </div>
            </a>
            <hr className="border-0 border-b border-gray-500" />
            <a href="#" className="flex items-center gap-4 group hover:bg-gray-600 bg-gray-700 h-20">
                <div className="flex flex-col flex-1 p-2">
                    <span className="font-bold text-base text-gray-200">Wallpapers exclusivos</span>
                    <span className="text-xs text-gray-300">Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina</span>
                </div>
                <div className="bg-green-500 w-12 flex items-center justify-center h-full">
                    <FileArrowDown size={24} />
                </div>
            </a>
        </div>
    )
}