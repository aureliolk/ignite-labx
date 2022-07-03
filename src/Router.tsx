import { useContext } from "react"
import { Route, Routes, Router } from "react-router-dom"
import { ChildrenProps } from "./components/Layout"
import { AuthContext } from "./contexts/AuthContext"
import { Event } from "./pages/Event"
import { Home } from "./pages/Home"
import { history } from "./lib/history"

const Auth = ({ children }: ChildrenProps) => {
    const { signin } = useContext(AuthContext)
    return <> {!signin ? children : <Event />} </>
}

const RequireAuth = ({ children }: ChildrenProps) => {
    const { signin } = useContext(AuthContext)
    return <>{signin ? children : <Home />}</>
}

export const Routerx = () => {
    return (
        <Routes >
            <Route path="/" element={<Auth children={<Home />} />} />
            <Route path="/event" element={<RequireAuth children={<Event />} />} />
            <Route path="/event/lesson/:slug" element={<RequireAuth children={<Event />} />} />
        </Routes>
    )
}   
