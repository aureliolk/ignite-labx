import { Footer } from "./layout/Footer"
import { Header } from "./layout/Header"

export interface ChildrenProps {
    children: React.ReactNode
}

export const Layout = ({ children }: ChildrenProps) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}