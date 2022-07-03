import { CaretLeft, CaretRight, CheckCircle, FileArrowDown, Lock, Spinner } from "phosphor-react"
import { isPast, format, parseISO } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR"
import { Link, useParams } from "react-router-dom"
import classNames from "classnames"
import { useGetLessonsQuery } from "../graphql/generated"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"


export const Lessons = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data } = useGetLessonsQuery()
    const {showMenu} = useContext(AuthContext)

    if(!data){
        return <div className="w-full h-full flex items-center justify-center"><Spinner size={32} className="animate-spin" /></div>
    }

    return (
        <>
            {data?.lessons.map(lesson => {
                return (
                    <div key={lesson.id}>
                        <Link to={"/event/lesson/" + lesson.slug} onClick={()=>{showMenu(false)}} className="group">
                            <div className="flex flex-col gap-2 mb-2">
                                <header className="text-sm text-gray-300 ">
                                    {format(parseISO(lesson.availableAt), "eeee ' • ' dd ' de ' MMMM ' • ' k'h'mm", {
                                        locale: ptBR
                                    })}
                                </header>
                                <main className={classNames("relative border border-gray-500 p-4 rounded flex flex-col gap-2 h-28 group-hover:border group-hover:border-green-500", { "bg-green-500": lesson.slug === slug })}>
                                    <div className="flex items-center justify-between ">
                                        {isPast(parseISO(lesson.availableAt)) ? (
                                            <span className={classNames("text-blue-500 flex items-center gap-1 text-lg lg:text-sm font-medium", { "text-gray-100": lesson.slug === slug })}>
                                                <CheckCircle size={20} /> Conteúdo liberado
                                            </span>
                                        ) : (
                                            <span className="text-orange-500 flex items-center gap-1 text-lg lg:text-base font-medium">
                                                <Lock size={20} /> Em Breve
                                            </span>
                                        )}
                                        <span className={classNames("border border-green-300 p-1 rounded text-base lg:text-xs", { "border-gray-100": lesson.slug === slug })}>
                                            {lesson.lessonType === 'live' ? (
                                                <span className={classNames({"text-gray-100": lesson.slug !== slug}, { "text-gray-100": lesson.slug === slug })}>AO VIVO</span>
                                            ) : (
                                                <span className={classNames("text-gray-100", { "text-gray-100": lesson.slug === slug })}>AULA PRATICA</span>
                                            )}
                                        </span>
                                    </div>
                                    <strong className="text-gray-100 text:base lg:text-sm">{lesson.title}</strong>
                                    {lesson.slug === slug && <CaretLeft className="text-green-500 absolute inset-center left-[-2px]" weight="fill" />}
                                </main>
                            </div>
                        </Link>
                    </div>
                )
            })}
             
        </>
    )
}


