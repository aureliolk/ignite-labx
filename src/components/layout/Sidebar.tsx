import classNames from "classnames"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

import { Lessons } from "../Lessons"
import { Material } from "../Material"

export const Sidebar = () => {
    const { menu } = useContext(AuthContext)

    return (
        <div className={classNames({ "w-[360px] py-2 px-4 bg-gray-700 flex-col  hidden lg:flex  ": menu === false }, { "w-full h-screen bg-gray-700  flex-col gap-4 flex fixed z-50 pb-24": menu === true })}>
            <span className="block py-4 text-2xl font-bold bg-gray-500 text-center lg:text-start lg:border-0 lg:border-b lg:border-gray-500 lg:bg-transparent">
                Cronogramas das aulas
            </span>
            <div className="max-h-screen lg:max-h-[1030px] overflow-y-scroll scrollbar scrollbar-thumb-green-500  py:4 px-8 lg:p-4  flex flex-col gap-4">
                <Lessons />
            </div>
            <div className="hidden lg:block"><Material /></div>
        </div>
    )
}