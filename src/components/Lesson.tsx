import { DiscordLogo, DotsThreeOutlineVertical, Lightning, Pencil, Spinner, TelegramLogo, Trash, UserCircle } from "phosphor-react";
import { Player, DefaultUi, Youtube } from "@vime/react";
import { useCreatCommentMutation, useDeleteCommentMutation, useGetLessonDataQuery, useUpdateCommentMutation } from "../graphql/generated";
import "@vime/core/themes/default.css"
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { format, formatDistanceToNowStrict } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import { Material } from "./Material";
import classNames from "classnames";


type SlugDataProps = {
    lessonSlug: string | undefined
}

export const Lesson = (props: SlugDataProps) => {
    const [loading, setIsloading] = useState(false)
    const { user } = useContext(AuthContext)
    const [id, setId] = useState("")
    const [comment, setCommet] = useState("")
    const [button, sentButton] = useState(false)
    const [commentOption, setCommentOption] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editComment, setEditComment] = useState("")
    const [dateEdit, setDateEdit] = useState("")
    const [createComment] = useCreatCommentMutation()
    const [updateComment] = useUpdateCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()

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

    console.log(data)

    useEffect(() => {
        if (comment.length > 0) {
            sentButton(true)
        } else if (comment.length <= 0) {
            sentButton(false)
        }
    }, [comment])


    async function sendComment(e: FormEvent) {
        e.preventDefault()
        setIsloading(true)
        createComment({
            variables: {
                slug: props.lessonSlug,
                avatar: user?.user_metadata?.avatar_url,
                user: user?.user_metadata?.name || user?.name,
                comment
            }
        }).then(() => {
            setIsloading(false)
            refetch({ slug: props.lessonSlug })
            setCommet("")

        })
    }

    async function UpdateComment(e: FormEvent) {
        e.preventDefault()
        setIsloading(true)

        updateComment({
            variables: {
                id,
                comment: editComment
            }
        }).then((res) => {
            refetch()
            setIsloading(false)
            setEdit(false)
            setDateEdit(res.data?.updateFeedback?.updatedAt)
        })
    }

    async function DeleteComment() {
        setIsloading(true)
        deleteComment({
            variables: {
                id
            },

        }).then(() => {
            refetch()
            setIsloading(false)
        })
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
                <div className="w-full h-full max-w-[1110px] max-h-[60vh] aspect-video z-40">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row align-super p-6 gap-6">
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
                    <form id="feedback" onSubmit={sendComment} className="w-full flex">
                        <input placeholder="Digite aqui seu comentario" type="text" onChange={(e) => { setCommet(e.target.value) }} value={comment} className={classNames("flex-1 text-lg lg:text-sm bg-transparent border-0 border-b border-gray-500 outline-none  px-4 h-10", { "bg-gray-700 border-none rounded": button === true })} />
                        {button && <button className="w-12 h-10 p-2 bg-green-500 rounded rounded-l-none flex items-center justify-center text-2xl">{loading && !edit ? <Spinner className="animate-spin" /> : <TelegramLogo className="text-gray-40 hover:text-[30px] hover:text-gray-200 transition-all" />}</button>}
                    </form>
                </div>
                <div className="w-full  max-h-[473px] overflow-y-scroll scrollbar scrollbar-thumb-green-500">
                    {data.feedbacks?.map(comment => {
                        return (
                            <div key={comment.id} className="group">
                                {edit && comment.id === id ? (
                                    <>
                                        <form onSubmit={UpdateComment}>
                                            <div className="flex items-center gap-2 mt-4 py-2 relative">
                                                <div className="inline-block">
                                                    {comment.authorAvatar ? <img className="w-[35px] h-[35px] rounded-full" src={comment.authorAvatar} alt={`Imagem de ${comment.autor}`} /> : <UserCircle size={35} />}
                                                </div>
                                                <div className="w-full">
                                                    <div className="flex text-xs items-center gap-2"><strong className="text-sm text-gray-50">{comment.autor}</strong>
                                                        {comment.createdAt !== comment.updatedAt ? (
                                                            <span>Editado há {formatDistanceToNowStrict(
                                                                new Date(year(comment.updatedAt), month(comment.updatedAt) - 1, day(comment.updatedAt), hour(comment.updatedAt), min(comment.updatedAt), sec(comment.updatedAt)), {
                                                                locale: ptBR,
                                                                addSuffix: false
                                                            })}
                                                            </span>
                                                        ) : (
                                                            <span>Há {formatDistanceToNowStrict(
                                                                new Date(year(comment.createdAt), month(comment.createdAt) - 1, day(comment.createdAt), hour(comment.createdAt), min(comment.createdAt), sec(comment.createdAt)), {
                                                                locale: ptBR,
                                                                addSuffix: false
                                                            })}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex w-full">
                                                        <input type={"text"} onChange={(e) => { setEditComment(e.target.value) }} value={editComment} className={classNames("text-lage lg:text-sm bg-transparent border-0 border-b border-gray-500 outline-none p-2 w-full ho", { "bg-gray-700 border-none rounded": editComment.length > 0 })} />
                                                        {/* {editComment.length > 0 && <button className="bg-green-500 rounded rounded-l-none flex items-center justify-center text-2xl">{loading ? <Spinner className="animate-spin" /> : <TelegramLogo className="text-gray-40 hover:text-[30px] hover:text-gray-200 transition-all" />}</button>} */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="gap-1 inline-flex float-right text-sm   ">
                                                <button type="button" className="px-8 py-1" onClick={() => setEdit(false)}>Cancelar</button>
                                                <button className="bg-gray-500 px-8 py-1" onClick={() => { setId(comment.id), setEditComment(editComment) }}>{loading && edit ? <Spinner className="animate-spin" /> : "Editar"}</button>
                                            </div>
                                        </form >


                                    </>
                                ) : (
                                    <div className="flex items-center gap-2 mt-4 py-2 relative">
                                        <div className="inline-block">
                                            {comment.authorAvatar ? <img className="w-[35px] h-[35px] rounded-full" src={comment.authorAvatar} alt={`Imagem de ${comment.autor}`} /> : <UserCircle size={35} />}
                                        </div>
                                        <div >
                                            <div className="flex text-xs items-center gap-2"><strong className="text-sm text-gray-50">{comment.autor}</strong>
                                                {comment.createdAt !== comment.updatedAt ? (
                                                    <span>Editado há {formatDistanceToNowStrict(
                                                        new Date(year(comment.updatedAt), month(comment.updatedAt) - 1, day(comment.updatedAt), hour(comment.updatedAt), min(comment.updatedAt), sec(comment.updatedAt)), {
                                                        locale: ptBR,
                                                        addSuffix: false
                                                    })}
                                                    </span>
                                                ) : (
                                                    <span>Há {formatDistanceToNowStrict(
                                                        new Date(year(comment.createdAt), month(comment.createdAt) - 1, day(comment.createdAt), hour(comment.createdAt), min(comment.createdAt), sec(comment.createdAt)), {
                                                        locale: ptBR,
                                                        addSuffix: false
                                                    })}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-lage lg:text-sm">{comment.authorComment}</p>
                                        </div>
                                        <button onClick={() => { setCommentOption(true), setId(comment.id) }} className="absolute right-0 hidden group-hover:block cursor-pointer">
                                            <DotsThreeOutlineVertical className="text-gray-100" weight="fill" />
                                        </button>
                                    </div>
                                )}
                                {commentOption && comment.id === id &&
                                    <div className="inline-flex flex-col float-right text-sm gap-1 w-20 border  border-gray-500 group" onMouseLeave={() => { !loading && setCommentOption(false) }}>
                                        <button onClick={() => {setCommentOption(false), setEdit(true), setEditComment(comment.authorComment as string) }} className="bg-transparent hover:bg-gray-700 w-full p-2 flex items-center justify-between"><Pencil size={18} /><span>Editar</span></button>
                                        <button onClick={() => { DeleteComment() }} className="bg-transparent hover:bg-gray-700 w-full p-2 flex items-center justify-between">{loading && comment.id === id ? <Spinner className="animate-spin" /> : <><Trash size={18} /><span>Excluir</span></>}</button>
                                    </div>}
                            </div>

                        )
                    })}
                </div>
            </div>
            {user && (
                <div className="lg:hidden">
                    <Material />
                </div>
            )}
        </div>
    )
}   