import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiSearch } from "react-icons/fi";

export function Header() {
    return (
        <header className="h-20">
            <nav className="w-full h-20 border-b-black/10 lg:border-b max-md:shadow-md fixed top-0 bg-white z-[999]">
                <div className='w-full h-full max-w-8xl mx-auto max-md:px-4 flex items-center justify-between'>
                    <div className="flex gap-6 flex-1">
                        <Link href={'/'} className="flex">
                            <Image src={'/logo.svg'} alt="" width={164} height={24} />
                        </Link>
                        <div className="hidden lg:flex w-full max-w-[400px] px-3 h-12 border items-center rounded-md gap-3">
                            <FiSearch color={'#591BDC'} size={20} />
                            <input
                                type="text"
                                placeholder="Buscar eventos, shows, espetáculos, cursos..."
                                className="w-full outline-none overflow-hidden text-ellipsis"
                            />
                        </div>
                    </div>
                    <div className='hidden lg:flex gap-4 items-center'>
                        <Link href={'/entrar'} className='text-primary font-semibold'>Acesse sua conta</Link>
                        <Link href={'/criar-conta'} className='px-8 bg-primary h-12 rounded-md text-white font-semibold flex items-center'>Cadastre-se</Link>
                    </div>
                    <button className="flex lg:hidden"><FiMenu size={24} /></button>
                </div>
            </nav>
        </header>
    )
}