
import {useParams } from "react-router-dom"
import { Sidebar } from "../components/layout/Sidebar"
import { Lesson } from "../components/Lesson"

export const Event = () => {
    const {slug} = useParams<{slug:string}>()
    return (
        <main className="flex w-full">
            <Lesson lessonSlug={slug} />
            <Sidebar />
        </main>
    )
}

