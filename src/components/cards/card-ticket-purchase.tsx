import Image from "next/image";
import { IEvent } from "./card-event";
import { FiClock, FiFileText, FiMail, FiMapPin, FiX } from "react-icons/fi";
import { LuPrinter } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { ticketsData } from "@/app/(site)/evento/checkout/[...id]/page";
import { maskPrice } from "@/helpers/mask";


export function CardTicketPurchase({ event }: { event: IEvent }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(show) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [show]);

    return (
        <div className="flex flex-col shadow-lg rounded-md">
            <div className="w-full h-[148px] max-lg:h-[200px] overflow-hidden relative rounded-t-md">
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
                <button className="flex items-center gap-4 hover:text-primary-hover" onClick={() => setShow(true)}><FiFileText />Ver pedido</button>
            </div>
            {show && <Modal close={() => setShow(false)} />}
        </div>
    )
}

function Modal({ close }) {
    const ref = useRef(null);
    const [tickets, setTickets] = useState([]);
    const [total, setTotal] = useState(0);

    const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            close();
        }
    };

    useEffect(() => {
        const tickets = []
        ticketsData.map(item => {
            for (let i = 0; i < +item.quantity; i++) {
                tickets.push(item.ticket);
            }
        });
        setTickets(tickets);
        let total = 0;
        ticketsData.forEach(item => {
            total = total + (+item.quantity) * (item.ticket.price + item.ticket.service_charge);
        });
        setTotal(total);

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 z-[9999]">
            <div className="w-full max-w-screen-lg max-lg:h-screen h-[80vh] bg-white lg:rounded-lg p-4 relative overflow-y-auto flex flex-col max-lg:items-center" ref={ref}>
                <button onClick={close} className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-md absolute top-2 right-2"><FiX size={24} /></button>
                <h2 className="text-xl font-semibold mt-8">Pedido nº 1G8VD4BQ9VQ</h2>
                <div className="flex gap-4 max-lg:flex-col items-center justify-between w-full mt-8">
                    <div className="flex flex-col max-lg:items-center">
                        <span className="text-xs">Enviado às 09h54 de 26/05/2022 a:</span>
                        <h4 className="mt-4 text-lg font-medium">Ezequiel Pires</h4>
                        <span className="text-sm font-light">ezequiel.pires08000@gmail.com</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center w-64 border-2 py-4 rounded-md bg-primary-light border-primary max-lg:w-full">
                        <span className="text-sm">Nº DO PEDIDO:</span>
                        <span className="text-xl font-medium">1G8VD4BQ9VQ</span>
                        <strong className="text-primary-hover">Confirmado</strong>
                        <span className="text-lg">R$ {maskPrice(total.toString())}</span>
                    </div>
                </div>
                <h2 className="text-xl font-semibold mt-8 max-lg:text-center">Ingressos comprados neste pedido</h2>
                <div className="border border-black/20 rounded-md mt-4 p-6 w-full">
                    {tickets.map((item, index) => (
                        <div key={index} className={`flex max-lg:flex-col justify-between items-center ${index < tickets.length - 1 && 'border-b'} gap-4 p-4`}>
                            <div className="flex flex-col gap-1 max-lg:items-center">
                                <span className="text-sm font-semibold text-gray-3">Ezequiel Pires</span>
                                <span className="text-sm font-medium text-gray-500">ezequiel.pires@gmail.com</span>
                                <span className="text-sm font-semibold text-gray-3">{item.name}</span>
                                <span className="text-sm font-medium text-gray-500">R$ {maskPrice((item.price).toString())} (+ R$ {maskPrice((item.service_charge).toString())} taxa)</span>
                                <span className="text-xs font-light text-gray-6">Vendas até 26/01/2024</span>
                            </div>
                            <button className="flex items-center gap-4 text-primary hover:text-primary-hover font-medium"><LuPrinter />Baixar ingresso</button>
                        </div>
                    ))}
                </div>
                <span></span>
            </div>
        </div>
    )
}