'use client'

import { ButtonPrimary } from "@/components/buttons/button-primary";
import { ButtonSecondary } from "@/components/buttons/button-secondary";
import { InputText } from "@/components/form-components/input-text";
import { useForm } from "@/hooks/useForm";
import { AuthService } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookies } from "./actions";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const email = useForm();
    const password = useForm();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await AuthService.signin(email.value, password.value);
            if(res) {
                await setCookies('access_token', JSON.stringify(res.access_token));
                await setCookies('user', JSON.stringify(res.user));
                router.push('/');
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="w-screen h-screen flex items-center justify-center flex-col gap-6">
            <div className="w-full max-w-md flex items-center flex-col gap-6 max-lg:px-3">
                <div className="flex flex-col items-center">
                    <Link href={'/'} className="flex">
                        <Image src={'/logo.svg'} alt="" width={218} height={24} />
                    </Link>
                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Boas vindas ao Ingressos Fast!</h2>
                    <span className="text-base font-light text-gray-800">Seu espaço de ingressos online</span>
                </div>
                <form className="w-full max-w-md flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
                    <InputText
                        id="email"
                        title="Email"
                        type="email"
                        placeholder="Insira o seu email"
                        {...email}
                    />
                    <InputText
                        id="password"
                        title="Senha"
                        type="password"
                        placeholder="Insira a sua senha"
                        {...password}
                    />
                    {error && <span className="px-3 h-12 flex items-center bg-red-100 text-red-500 font-medium rounded-md">Erro ao fazer login, tente novamente.</span>}
                    <div className="flex justify-end">
                        <Link href={'/recuperar-senha'} className="font-medium">Esqueceu a senha?</Link>
                    </div>
                    <ButtonPrimary
                        title="Entrar"
                        full={true}
                        onClick={() => handleSubmit()}
                        loading={loading}
                    />
                </form>
                <span>Ainda não tem acesso?</span>
                <ButtonSecondary
                    title="Criar uma conta"
                    full={true}
                    onClick={() => router.push('/criar-conta')}
                />
            </div>
        </main>
    )
}