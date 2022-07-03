
import { Navigate, useParams } from "react-router-dom"
import { Sidebar } from "../components/layout/Sidebar"
import { Lesson } from "../components/Lesson"

export const Event = () => {
    const {slug} = useParams<{slug:string}>()

    if(!slug){
        return Navigate({to:"/event/lesson/comecando-no-reactjs-em-2022"})
    }
    
    return (
        <main className="flex w-full relative">
            <Lesson lessonSlug={slug} />
            <Sidebar/>
        </main>
    )
}