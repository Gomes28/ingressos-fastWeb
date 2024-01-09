import Image from "next/image";
import { IEvent } from "./card-event";
import { FiClock, FiFileText, FiMail, FiMapPin, FiUsers } from "react-icons/fi";
import { LuPrinter } from "react-icons/lu";


export function CardTicketPurchase({ event }: { event: IEvent }) {
    return (
        <div className="flex flex-col shadow-lg rounded-md">
            <div className="w-full h-[148px] overflow-hidden relative rounded-t-md">
                <Image src={event.image} alt={event.name} fill />
            </div>
            <div className="flex flex-col p-3 border-b h-[81px]">
                <h4 className="text-lg font-semibold line-clamp-2">{event.name}</h4>
            </div>
            <div className="flex flex-col p-3 border-b">
                <div className="flex gap-4">
                    <span className="flex mt-1 text-gray-4">
                        <FiClock />
                    </span>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-3">Sábado e Domingo às 15h00</span>
                        <span className="text-xs font-light text-gray-4">27 a 28 de Janeiro</span>
                    </div>
                </div>
                <div className="flex gap-4 mt-4">
                    <span className="flex mt-1 text-gray-4">
                        <FiMapPin />
                    </span>
                    <span className="text-sm font-medium text-gray-3 line-clamp-1">{event?.address}</span>
                </div>
            </div>
            <div className="flex flex-col gap-3 p-3 text-primary font-medium">
                <button className="flex items-center gap-4 hover:text-primary-hover"><LuPrinter />Baixar ingresso</button>
                <button className="flex items-center gap-4 hover:text-primary-hover"><FiMail />Fale com o produtor</button>
                <button className="flex items-center gap-4 hover:text-primary-hover"><FiFileText />Ver pedido</button>
            </div>
        </div>
    )
}