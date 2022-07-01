import { DiscordLogo, Lightning, Spinner, TelegramLogo, UserCircle } from "phosphor-react";
import { Player, DefaultUi, Youtube } from "@vime/react";
import { useCreatCommentMutation, useGetLessonDataQuery } from "../graphql/generated";
import "@vime/core/themes/default.css"
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { format, formatDistance, formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"


type SlugDataProps = {
    lessonSlug: string | undefined
}

export const Lesson = (props: SlugDataProps) => {
    const [loading, setIsloading] = useState(false)
    const { user } = useContext(AuthContext)
    const [comment, setCommet] = useState("")
    const [createComment] = useCreatCommentMutation()
    
    const year = (y: string) => {
        return Number(format(new Date(y), "yyyy"))
    }
    const month = (m: string) => {
        return Number(format(new Date(m), "MM"))
    }
    const day = (d: string) => {
        return Number(format(new Date(d), "dd"))
    }
    const hour = (h: string) => {
        return Number(format(new Date(h), "HH"))
    }
    const min = (m: string) => {
        return Number(format(new Date(m), "mm"))
    }
    const sec = (s: string) => {
        return Number(format(new Date(s), "ss"))
    }
    const { data, refetch } = useGetLessonDataQuery({
        variables: {
            slug: props.lessonSlug
        }
    })
    

    async function sendComment() {
        setIsloading(true)
        if(!user?.name){
            createComment({
                variables: {
                    slug: props.lessonSlug,
                    avatar: user?.user_metadata?.avatar_url,
                    user: user?.user_metadata?.name,
                    comment
                }
            }).then(() => {
                setIsloading(false)
                refetch({ slug: props.lessonSlug })
            })
        }else{
            createComment({
                variables: {
                    slug: props.lessonSlug,
                    avatar: user?.user_metadata?.avatar_url,
                    user: user?.name,
                    comment
                }
            }).then(() => {
                setIsloading(false)
                refetch({ slug: props.lessonSlug })
            })
        }
    }

    if (!data || !data.lesson) {
        return (
            <div className="flex-1 h-screen flex items-center justify-center">
                <Spinner size={32} className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex-1 h-full">
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

            <div className="p-6 flex gap-4 flex-col">
                <strong className="text-2xl font-bold leading-snug">Comentarios</strong>
                <div className="flex items-center">
                    <span className="mr-2">{user?.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} className="w-[32px] rounded-full" /> : <UserCircle size={35} />}</span>
                    <input placeholder="Digite aqui seu comentario" type="text" onChange={(e) => { setCommet(e.target.value) }} className="flex-1 bg-transparent text-sm border border-t-0 border-r-0 border-l-0 border-b-gray-500 outline-none focus:bg-gray-700 focus:border-none focus:rounded px-4 h-10 " />
                    <button onClick={() => { sendComment() }} className="w-12 h-10 p-2 bg-green-500 rounded rounded-l-none flex items-center justify-center text-2xl">{loading ? <Spinner className="animate-spin" /> : <TelegramLogo className="text-gray-40 hover:text-[30px] hover:text-gray-200 transition-all" />}</button>
                </div>
                <div className="w-full  max-h-[473px] overflow-y-scroll scrollbar scrollbar-thumb-green-500">
                    {data.feedbacks?.map(comment => {
                        return (
                            <div key={comment.id} className="flex items-center gap-2 p-2">
                                <div className="inline-block">
                                    {comment.authorAvatar ? <img className="w-[35px] h-[35px] rounded-full" src={comment.authorAvatar} alt={`Imagem de ${comment.autor}`} /> : <UserCircle size={35} />}
                                </div>
                                <div>
                                    <div className="flex text-xs items-center gap-2"><strong className="text-sm text-gray-50">{comment.autor}</strong> <span> {formatDistanceToNowStrict(
                                        new Date( year(comment.createdAt), month(comment.createdAt)-1, day(comment.createdAt),  hour(comment.createdAt), min(comment.createdAt), sec(comment.createdAt)),{
                                        locale:ptBR,
                                        addSuffix:false
                                    }
                                    )}</span></div>
                                    <p className="text-sm">{comment.authorComment}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}