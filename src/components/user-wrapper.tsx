'use client'

import { deleteCookies } from "@/app/(auth)/entrar/actions";
import { IUser } from "@/models/user.model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiHeart, FiInfo, FiLogOut, FiUser } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";


export function UserWrapper({ user }: { user: IUser }) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    const name = user.name.split(' ', 2);

    const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
        }
    };

    const handleLogout = async () => {
        await deleteCookies('user');
        await deleteCookies('access_token');

        router.refresh();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button className="flex gap-3 items-center cursor-pointer" onClick={() => setShow(!show)}>
                <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center font-semibold text-xl">{user.name.substring(0, 1)}</div>
                <span>{name[0] ?? ``} {name[1] ?? ``}</span>
                
                <FiChevronDown />
            </button>
            {show &&
                <div className="absolute right-0 w-full min-h-28 border rounded-md bg-white top-[110%]">
                    <ul className="p-3 flex flex-col gap-2">
                        <li>
                            <Link href={'/meus-pedidos'} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-sm"><IoTicketOutline size={20} />Ingressos</Link>
                        </li>
                        <li>
                            <Link href={'/favoritos'} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-sm"><FiHeart size={20}/>Favoritos</Link>
                        </li>
                        <li>
                            <Link href={'/minha-conta'} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-sm"><FiUser size={20}/>Minha conta</Link>
                        </li>
                        <li>
                            <Link href={''} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-sm"><FiInfo size={20}/>Central de ajuda</Link>
                        </li>
                        <li>
                            <button onClick={() => handleLogout()} className="h-10 w-full flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md text-sm"><FiLogOut size={20}/>Sair</button>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}