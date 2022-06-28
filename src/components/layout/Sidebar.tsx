import { Lessons } from "../Lessons"

export const Sidebar = () =>{

    return(
        <div className="w-[360px] max-h-[1030px] py-2 px-4 bg-gray-700 border-l border-gray-500 flex flex-col gap-4 ">
            <span className="block py-4 text-2xl font-bold border-b border-gray-500 mb-2">
                Cronogramas das aulas 
            </span> 
            <div className="overflow-y-scroll scrollbar scrollbar-thumb-green-500 p-4">
                <Lessons />
            </div>
        </div>
    )
}