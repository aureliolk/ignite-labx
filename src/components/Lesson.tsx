import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";
import { Player, DefaultUi, Youtube } from "@vime/react";
import { useGetLessonDataQuery } from "../graphql/generated";
import "@vime/core/themes/default.css"

type SlugDataProps = {
    lessonSlug: string
}

export const Lesson = (props: SlugDataProps) => {
    const { data } = useGetLessonDataQuery({
        variables: {
            slug: props.lessonSlug
        }
    })

    if (!data || !data.lesson) {
        return (
            <div className="flex-1">
                Carregando ...
            </div>
        )
    }

    return (
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="w-full h-full max-w-[1110px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>
            <div className="flex align-super p-6 gap-6">
                <div className="flex-1 flex-col flex gap-3">
                    <strong className="text-2xl font-bold leading-snug">
                        {data.lesson.title}
                    </strong>
                    <p className="text-base font-normal leading-relaxed text-gray-200">{data.lesson.description}</p>
                    {data.lesson.teacher && (
                        <div className="w-[292px] flex gap-2 items-center">
                            <img className="w-10 h-10 rounded-full ring ring-green-500" src={data.lesson.teacher.avatarURL} alt="Avatar do Professor Aurelio" />
                            <div className="flex flex-col">
                                <span className="font-bold text-base">{data.lesson.teacher.name}</span>
                                <span className="text-gray-300 text-xs">{data.lesson.teacher.bio}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-3 ">
                    <a href="#" className="uppercase p-4 bg-green-500 text-gray-100  h-14 text-sm flex items-center justify-center gap-2 rounded font-bold hover:bg-green-700 transition-colors">
                        <DiscordLogo size={25} /> Comunidade no discord
                    </a>
                    <a href="#" className="uppercase p-4 border border-blue-500 text-blue-500  h-14 text-sm flex items-center justify-center gap-2 rounded font-bold hover:bg-blue-500 hover:text-gray-900 transition-colors">
                        <Lightning size={25} /> Acesse o Desafio
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-2 p-6 gap-6">
                <a href="#" className="group hover:bg-gray-600 h-[134px] bg-gray-700 flex items-center gap-4">
                    <div className="bg-green-500 w-20 flex items-center justify-center h-full">
                        <FileArrowDown size={24} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="font-bold text-2xl text-gray-200">Material Complementar</span>
                        <span className="text-sm leading-6 text-gray-300">Acesse o material complementar para acelerar o seu desenvolvimento</span>
                    </div>
                    <div className="px-6 group-hover:text-blue-500">
                        <CaretRight />
                    </div>
                </a>
                <a href="#" className="group hover:bg-gray-600 h-[134px] bg-gray-700 flex items-center gap-4">
                    <div className="bg-green-500 w-20 flex items-center justify-center h-full">
                        <FileArrowDown size={24} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="font-bold text-2xl text-gray-200">Wallpapers exclusivos</span>
                        <span className="text-sm leading-6 text-gray-300">Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina</span>
                    </div>
                    <div className="px-6 group-hover:text-blue-500">
                        <CaretRight />
                    </div>
                </a>
            </div>
        </div>
    )
}