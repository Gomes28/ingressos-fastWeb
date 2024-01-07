import { categories } from "@/utils/categories";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="flex flex-col">
            <div className="min-h-[500px] bg-primary py-12 text-white">
                <div className="w-full max-w-8xl mx-auto px-3">
                    <div className="flex items-center justify-between border-b border-white/15 pb-6">
                        <Image src={'/logo-white.svg'} alt="" width={218} height={24} />
                    </div>
                    <div className="grid lg:grid-cols-4 mt-6 gap-6">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xl font-semibold">Encontre eventos</h4>
                            <ul className="flex flex-col gap-3 text-white/80">
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Hoje</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Amanhã</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Esta semana</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Este fim de semana</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Próxima semana</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Este mês</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xl font-semibold">Categorias</h4>
                            <ul className="flex flex-col gap-3 text-white/80">
                                {categories.map(item => (
                                    <li key={item.id}>
                                        <Link href={'/'} className="hover:text-white transition-all">{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xl font-semibold">Para produtores</h4>
                            <ul className="flex flex-col gap-3 text-white/80">
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Soluções</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Preço</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Cases de sucesso</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Consultor de vendas</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xl font-semibold">Ajuda</h4>
                            <ul className="flex flex-col gap-3 text-white/80">
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Produtores de Eventos</Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="hover:text-white transition-all">Compradores e Participantes</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:h-12 bg-gray-900 w-full">
                <div className="w-full h-full max-w-8xl mx-auto flex max-md:flex-col items-center justify-between py-3 gap-3">
                    <span className="text-white text-sm font-light">Ingressos Fast Soluções S.A. © Copyright 2023</span>
                    <span className="text-white/70 text-sm font-light">Desenvolvido por <strong className="text-white font-semibold">Ezequiel Pires</strong></span>
                </div>
            </div>
        </footer>
    )
}