import { FileArrowDown, CaretRight } from "phosphor-react"
import { Lessons } from "../Lessons"

export const Sidebar = () =>{

    return(
        <div className="w-[360px] py-2 px-4 bg-gray-700 border-l border-gray-500 flex flex-col gap-4 ">
            <span className="block py-4 text-2xl font-bold border-b border-gray-500 mb-2">
                Cronogramas das aulas 
            </span> 
            <div className="max-h-[1030px] overflow-y-scroll scrollbar scrollbar-thumb-green-500 p-4">
                <Lessons />
            </div>
            <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center gap-4 group hover:bg-gray-600 bg-gray-700 ">
                    <div className="flex flex-col flex-1 p-2">
                        <span className="font-bold text-base text-gray-200">Material Complementar</span>
                        <span className="text-xs text-gray-300">Acesse o material complementar para acelerar o seu desenvolvimento</span>
                    </div>
                    <div className="bg-green-500 w-12 flex items-center justify-center h-full">
                        <FileArrowDown size={24} />
                    </div>
                </a>
                <a href="#" className="flex items-center gap-4 group hover:bg-gray-600 bg-gray-700">
                    <div className="flex flex-col flex-1 p-2">
                        <span className="font-bold text-base text-gray-200">Wallpapers exclusivos</span>
                        <span className="text-xs text-gray-300">Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina</span>
                    </div>
                    <div className="bg-green-500 w-12 flex items-center justify-center h-full">
                        <FileArrowDown size={24} />
                    </div>
                </a>
            </div>
        </div>
    )
}