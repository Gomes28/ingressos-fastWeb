import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { EventsSwiper } from "@/components/sections/events-swiper";
import { categories } from "@/utils/categories";
import { events } from "@/utils/events";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function EventsByCategoryPage({params}: {params: {id: string}}) {
    const category = categories.find(item => item.slug == params.id);
    
    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col gap-8 lg:gap-16">
                <div className="h-[300px] w-full relative">
                    <Image src={'/event-category.jpg'} alt="" fill className="object-cover"/>
                    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/80 px-3">
                        <div className="text-white h-full flex flex-col justify-between w-full max-w-8xl mx-auto py-6">
                            <ul className="text-sm flex items-center gap-4">
                                <li>
                                    <Link href={'/'}>Home</Link>
                                </li>
                                <li>
                                    <FiChevronRight />
                                </li>
                                <li>
                                    <Link href={'/'}>{category.name}</Link>
                                </li>
                            </ul>
                            <div className="flex flex-col gap-2 max-w-3xl">
                                <h1 className="text-3xl font-semibold">{category.name}</h1>
                                <h1>Apreciar uma peça de teatro, admirar um espetáculo em um teatro histórico ou conhecer uma cultura diferente da sua. Descubra os melhores eventos culturais da sua cidade e viva novas experiências.</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <EventsSwiper events={events} title={`${category.name} em destaque`} />
            </div>
            <Footer />
        </main>
    )
}