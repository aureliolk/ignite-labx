import { Footer } from "./layout/Footer"
import { Header } from "./layout/Header"

export interface ChildrenProps {
    children: React.ReactNode
}

export const Layout = ({ children }: ChildrenProps) => {
    return (
        <div className="relative">
            <div className="fixed z-50 top-0 w-full"><Header /></div>
            <div className="mt-[66px]">{children}</div>  
            <Footer />
        </div>
    )
}