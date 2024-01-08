'use client'

import Link from "next/link";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

export default function MyRequestsPage() {
    const [active, setActive] = useState(1);
    return (
        <div className="flex flex-col gap-8">
            <div className="h-[200px] w-full relative">
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/80 px-3">
                    <div className="text-white h-full flex flex-col justify-between w-full max-w-8xl mx-auto pt-6">
                        <ul className="text-sm flex items-center gap-4">
                            <li>
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li>
                                <FiChevronRight />
                            </li>
                            <li>
                                <Link href={'/meus-pedidos'}>Meus Pedidos</Link>
                            </li>
                        </ul>
                        <div className="flex flex-col gap-2 max-w-3xl">
                            <h1 className="text-3xl font-semibold">Meus pedidos</h1>
                            <div className="flex gap-2">
                                <button onClick={() => setActive(1)} className={`h-12 px-4 relative ${active == 1 && 'before:absolute before:w-full before:h-1 before:bg-secondary before:rounded-md before:bottom-[-2px] before:left-0'}`}>Ativos</button>
                                <button onClick={() => setActive(2)} className={`h-12 px-4 relative ${active == 2 && 'before:absolute before:w-full before:h-1 before:bg-secondary before:rounded-md before:bottom-[-2px] before:left-0'}`}>Encerrados</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}