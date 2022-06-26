import { CaretLeft, CheckCircle, Lock } from "phosphor-react"
import { isPast, format, parseISO } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR"
import { Link, useParams } from "react-router-dom"
import classNames from "classnames"
import { useGetLessonsQuery } from "../graphql/generated"


export const Lessons = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data } = useGetLessonsQuery()

    return (
        <>
            {data?.lessons.map(lesson => {
                return (
                    <div key={lesson.id}>
                        <Link to={"/event/lesson/" + lesson.slug} className="group">
                            <div className="flex flex-col gap-2 mb-2">
                                <header className="text-base text-gray-300 ">
                                    {format(parseISO(lesson.availableAt), "eeee ' • ' dd ' de ' MMMM ' • ' k'h'mm", {
                                        locale: ptBR
                                    })}
                                </header>
                                <main className={classNames("relative border border-gray-500 p-4 rounded flex flex-col gap-4 group-hover:border group-hover:border-green-500", { "bg-green-500": lesson.slug === slug })}>
                                <div className="flex items-center justify-between ">
                                    {isPast(parseISO(lesson.availableAt)) ? (
                                        <span className={classNames("text-blue-500 flex items-center gap-1 text-base font-medium", { "text-gray-100": lesson.slug === slug })}>
                                            <CheckCircle size={20} /> Conteúdo liberado
                                        </span>
                                    ) : (
                                        <span className="text-orange-500 flex items-center gap-1 text-base font-medium">
                                            <Lock size={20} /> Em Breve
                                        </span>
                                    )}
                                    <span className={classNames("border border-green-300 p-1 rounded text-xs", { "border-gray-100": lesson.slug === slug })}>
                                        {lesson.lessonType === 'live' ? (<span className={classNames("text-green-300", { "text-gray-100": lesson.slug === slug })}>AO VIVO</span>) : (<span className={classNames("text-grey-200", { "text-gray-100": lesson.slug === slug })}>AULA PRATICA</span>)}</span>
                                </div>
                                <strong className="text-gray-200 text-base">{lesson.title}</strong>
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


