import { Layout } from "phosphor-react"
import { Route, Routes } from "react-router-dom"
import { Event } from "./pages/Event"
import { Home } from "./pages/Home"

export const Router = () => {
    return (
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/event" element={<Event/>} />
                <Route path="/event/lesson/:slug" element={<Event/>} />

        </Routes>
    )
}
