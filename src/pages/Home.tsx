import { useState, FormEvent } from "react"
import { LgAcosLabV2 } from "../components/logo/lg-acoslabv2"
import { LogoReact } from "../components/logo/LogoReact"
import mokup from "../assets/mokup-event.png";
import { useGetSubscriberLazyQuery, useRegisterUserMutation } from "../graphql/generated";



export default function Home (){
    const [registerOn] = useRegisterUserMutation()
    const [loginOn] = useGetSubscriberLazyQuery()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [formLogin, setFormLogin] = useState(false)


    async function LoginUser(event: FormEvent) {
        event.preventDefault()
        setIsLoading(true)
        const res = await loginOn({
            variables: {
                email
            }
        })
        if (res.data?.subscriber === null) {
            setErrMsg("Esse email não está cadastrado")
            setTimeout(() => {
                setErrMsg("")
            }, 3000);
            setIsLoading(false)
            return
        } else {
            localStorage.setItem("user", JSON.stringify(res.data?.subscriber))
            setIsLoading(false)
            window.location.pathname = "/event/lesson/abertura-stage-1"
            return
        }
    }

    async function onRegister(event: FormEvent) {
        event.preventDefault()
        setIsLoading(true)
        const res = await registerOn({
            variables: {
                email,
                name
            }
        }).then(res => {
            localStorage.setItem("user", JSON.stringify(res.data?.createSubscriber))
            setIsLoading(false)
            window.location.pathname = "/event/lesson/abertura-stage-1"
            return
        }).catch(err => {
            setErrMsg("Esse email ja está cadastrado")
            setTimeout(() => {
                setErrMsg("")
            }, 3000);
            setIsLoading(false)
            return
        })
    }

    return (
        <div className="flex flex-col relative h-full p-20 w-full bg-blur bg-cover bg-no-repeat">
            <div className="absolute inset-center top-72">
                <LogoReact />
            </div>
            <div className="flex justify-between gap-8">
                <div className="w-[624px] flex flex-col gap-4">
                    <span className="w-52"><LgAcosLabV2 /></span>
                    <h1 className="text-[40px] font-normal text-gray-100 leading-tight">Construa uma <span className="text-blue-500">aplicação completa</span>, do zero, com <span className="text-blue-500">React</span></h1>
                    <p className="text-gray-200 text-base leading-relaxed font-normal">Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.</p>
                </div>
                <div className="w-[391px] max-h-[325px] rounded p-8 border border-gray-500 bg-gray-700 z-10 opacity-70 hover:opacity-100">
                    {formLogin ? (
                        <>
                            <form className="flex flex-col gap-3 " onSubmit={LoginUser}>
                                <span className="text-2xl font-bold">Insira seu Email</span>
                                <input
                                    className="text-base text-gray-300 rounded bg-gray-900 p-4"
                                    type="email"
                                    placeholder="Digite seu email"
                                    onChange={(event) => { setEmail(event.target.value) }}
                                />
                                <button className="bg-green-500 text-white h-14 rounded font-bold text-sm mt-1 opacity-70 hover:opacity-100">{isLoading ? "Fazendo login ... " : "FAZER LOGIN"}</button>
                            </form>
                            {errMsg ? (
                                <div className="text-sm text-center mt-2 text-red-600">{errMsg}</div>
                            ) : <button className="text-center w-full mt-2 text-sm underline hover:text-green-500" type="button" onClick={() => { setFormLogin(false) }}>Fazer cadastro</button>}
                        </>
                    ) : (
                        <>
                            <form className="flex flex-col gap-3 " onSubmit={onRegister}>
                                <span className="text-2xl font-bold">Inscreva-se Gratuitamente</span>
                                <input
                                    className="text-base text-gray-300 rounded bg-gray-900 p-4"
                                    type="text"
                                    placeholder="Digite seu nome"
                                    onChange={(event) => { setName(event.target.value) }}
                                />
                                <input
                                    className="text-base text-gray-300 rounded bg-gray-900 p-4"
                                    type="email"
                                    placeholder="Digite seu email"
                                    onChange={(event) => { setEmail(event.target.value) }}
                                />
                                <button className="bg-green-500 text-white h-14 rounded font-bold text-sm mt-1 opacity-70 hover:opacity-100">{isLoading ? "Registrando ... " : "GARANTIR MINHA VAGA"}</button>
                            </form>
                            {errMsg ? (
                                <div className="text-sm text-center mt-2 text-red-600">{errMsg}</div>
                            ) : <button className="text-center w-full mt-2 text-sm underline hover:text-green-500" type="button" onClick={() => { setFormLogin(true) }}>Ja sou cadastrado</button>}
                        </>
                    )}
                </div>
            </div>
            <img src={mokup} alt="" />
        </div>
    )
}
