'use client'

import { IUser } from "@/models/user.model";
import { useState } from "react"
import { FiHeart, FiHome, FiInfo, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import { UserWrapper } from "./user-wrapper";
import Link from "next/link";
import { IoTicketOutline } from "react-icons/io5";
import { deleteCookies } from "@/app/(auth)/entrar/actions";
import { useRouter } from "next/navigation";

export function Aside({ user }: { user?: IUser }) {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const handleLogout = async () => {
        await deleteCookies('user');
        await deleteCookies('access_token');

        router.refresh();
    }

    return (
        <>
            <button onClick={() => setShow(true)} className="flex lg:hidden"><FiMenu size={24} /></button>
            {show && <aside className="fixed bg-white top-0 bottom-0 right-0 left-0 px-3 py-4">
                <div className="flex justify-end mb-8">
                    <button onClick={() => setShow(false)} className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-md"><FiX size={24} /></button>
                </div>
                {user ?
                    <div className="flex justify-between items-center">
                        <button className="flex gap-3 items-center cursor-pointer" onClick={() => setShow(!show)}>
                            <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center font-semibold text-xl">{user.name.substring(0, 1)}</div>
                            <span>{user.name}</span>
                        </button>
                        <button onClick={() => handleLogout()}><FiLogOut size={24} /></button>
                    </div>
                    :
                    <div className='flex gap-4 items-center'>
                        <Link href={'/entrar'} className='text-primary font-semibold'>Acesse sua conta</Link>
                        <Link href={'/criar-conta'} className='px-8 bg-primary h-12 rounded-md text-white font-semibold flex items-center'>Cadastre-se</Link>
                    </div>
                }
                <ul className="flex flex-col gap-2 mt-8">
                    <li>
                        <Link href={'/'} onClick={() => setShow(false)} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-base"><FiHome size={20} />Home</Link>
                    </li>
                    <li>
                        <Link href={'/meus-pedidos'} onClick={() => setShow(false)} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-base"><IoTicketOutline size={20} />Ingressos</Link>
                    </li>
                    <li>
                        <Link href={'/favoritos'} onClick={() => setShow(false)} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-base"><FiHeart size={20} />Favoritos</Link>
                    </li>
                    <li>
                        <Link href={'/minha-conta'} onClick={() => setShow(false)} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-base"><FiUser size={20} />Minha conta</Link>
                    </li>
                    <li>
                        <Link href={''} onClick={() => setShow(false)} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-base"><FiInfo size={20} />Central de ajuda</Link>
                    </li>
                </ul>
            </aside>}
        </>
    )
}