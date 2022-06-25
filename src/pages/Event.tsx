
import { Navigate, useParams } from "react-router-dom"
import { Sidebar } from "../components/layout/Sidebar"
import { Lesson } from "../components/Lesson"

export const Event = () => {
    const {slug} = useParams<{slug:string}>()
    return (
        <main className="flex w-full h-full ">
            {slug ? <Lesson lessonSlug={slug} /> : (
                <Navigate to={"/event/lesson/abertura-stage-1"}/>
            )}
            <Sidebar />
        </main>
    )
}

