import { Lessons } from "../Lessons"

export const Sidebar = () =>{

    return(
        <div className="w-[330px] p-4 bg-gray-700 border-l border-gray-500 flex flex-col gap-4 h-auto">
            <span className="block py-4 text-2xl font-bold border-b border-gray-500 mb-2">
                Cronogramas das aulas 
            </span> 
            <Lessons />
        </div>
    )
}