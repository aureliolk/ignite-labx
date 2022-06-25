import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { LgAcosLabV2 } from "../components/logo/lg-acoslabv2"
import { LogoReact } from "../components/logo/LogoReact"
import { useRegisterUserMutation } from "../graphql/generated"

export const Home = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const [registerUser,{
        data
    }] = useRegisterUserMutation({
        variables:{
            name,
            email
        }
    })

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true)
        await registerUser({
            variables: {
                name,
                email
            }
        })
        return navigate("/event")
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
                <div className="w-[391px] h-[320px] rounded p-8 border border-gray-500 bg-gray-700 z-10 opacity-70 group">
                    <form className="flex flex-col gap-3 " onSubmit={onSubmit}>
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
                        <button className="bg-green-500 text-white h-14 rounded font-bold text-sm mt-1 opacity-70 hover:opacity-100 z-20">{isLoading ? "Registando ... " : "GARANTIR MINHA VAGA"}</button>
                        
                    </form>
                </div>
            </div>
            <img src="./src/assets/mokup-event.png" alt="" />
        </div>
    )
}