
import { Navigate, useParams } from "react-router-dom"
import { Sidebar } from "../components/layout/Sidebar"
import { Lesson } from "../components/Lesson"

export const Event = () => {
    const {slug} = useParams<{slug:string}>()
    
    if(!slug){
        return Navigate({to:"/event/lesson/abertura-stage-1"})
    }
    
    return (
        <main className="flex w-full">
            <Lesson lessonSlug={slug} />
            <Sidebar />
        </main>
    )
}

