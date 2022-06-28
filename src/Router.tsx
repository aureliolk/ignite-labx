import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { ChildrenProps } from "./components/Layout"
import { AuthContext } from "./contexts/AuthContext"
import { Event } from "./pages/Event"
import { Home } from "./pages/Home"



const RequireAuth = ({ children }: ChildrenProps) => {
    const {signin} = useContext(AuthContext)
    
    return (
        <>
            {signin ? children : <Home />}
        </>
    )

}

export const Router = () => {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event /> } />
            <Route path="/event/lesson/:slug" element={<Event />} />
            {/* <Route path="/event" element={<RequireAuth children={<Event />} />} />
            <Route path="/event/lesson/:slug" element={<RequireAuth children={<Event />} />} /> */}
        </Routes>
    )
}
