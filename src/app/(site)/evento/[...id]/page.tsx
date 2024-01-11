import { Footer } from "@/components/footer";
import { TicketsTable } from "@/components/sections/tickets-table";
import { events } from "@/utils/events";
import Image from "next/image";
import { FiClock, FiMapPin } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { ContentEvent } from "./content";
import { IParty } from "@/models/party.model";
import { fetchData } from "@/hooks/fetch";


export default async function EventPage({ params }: { params: { id: Array<string> } }) {
    const {partys: event}: {partys: IParty} = await fetchData(`party/${params.id[params.id.length - 1]}`);

    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
                <div className="h-[208px] lg:h-[400px] relative overflow-hidden mb-6 lg:mb-12">
                    {event?.logo && <Image src={'https://images.ingressosfast.com.br/' + event.logo} alt={event.name} fill className="object-cover h-full w-full" />}
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-3xl"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0">
                        <div className="w-full max-w-8xl mx-auto h-full flex items-center justify-center">
                            {event?.logo && <img src={'https://images.ingressosfast.com.br/' + event.logo} alt={event.name} className="h-full" />}
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-8xl mx-auto max-md:px-3 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-3">{event?.name}</h2>
                    <div className="flex gap-4 mt-4">
                        <span className="flex mt-1 text-gray-4">
                            <FiClock />
                        </span>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-3">Sábado e Domingo às 15h00</span>
                            <span className="text-sm font-light text-gray-4">27 a 28 de Janeiro</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <span className="flex mt-1 text-gray-4">
                            <FiMapPin />
                        </span>
                        <span className="text-base font-medium text-gray-3">{event.address.name} - {event.address.city}, {event.address.state}</span>
                    </div>
                    <div className="w-96 max-w-full border rounded-md mt-6">
                        <div className="flex gap-4 p-4">
                            <span className="mt-1">
                                <IoTicketOutline />
                            </span>
                            <div className="flex flex-col">
                                <span>Ingressos entre <strong>R$ 80,00 e R$ 1710,00</strong></span>
                                <span className="text-xs text-green-600 font-medium">Pague em até 12x ou no pix</span>
                            </div>
                        </div>
                        <a href="#tickets" className="h-12 w-full bg-secondary text-white font-semibold rounded-b-md flex items-center justify-center">Comprar Ingressos</a>
                    </div>
                    <ContentEvent content={event.description} />
                </div>
                <TicketsTable tickets={[]} event={event} />
            </div>
            <Footer />
        </main>
    )
}