'use client'

import { IUser } from "@/models/user.model";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiHeart, FiInfo, FiLogOut, FiUser } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";


export function UserWrapper({ user }: { user: IUser }) {
    const [show, setShow] = useState(false);
    const ref = useRef(null);

    const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
        }
    };

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
                <span>{user.name}</span>
                <FiChevronDown />
            </button>
            {show &&
                <div className="absolute right-0 w-full min-h-28 border rounded-md bg-white top-[110%]">
                    <ul className="p-3 flex flex-col gap-2">
                        <li>
                            <Link href={''} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md"><IoTicketOutline />Ingressos</Link>
                        </li>
                        <li>
                            <Link href={''} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md"><FiHeart />Favoritos</Link>
                        </li>
                        <li>
                            <Link href={''} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md"><FiUser />Minha conta</Link>
                        </li>
                        <li>
                            <Link href={''} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md"><FiInfo />Central de ajuda</Link>
                        </li>
                        <li>
                            <Link href={''} className="h-10 flex items-center gap-4 hover:bg-slate-100 transition-all bg-white px-3 rounded-md"><FiLogOut />Sair</Link>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}