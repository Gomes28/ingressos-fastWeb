'use client'

import { InputText } from "@/components/form-components/input-text";
import { Header } from "@/components/header";
import { events } from "@/utils/events";
import { useEffect, useState } from "react";
import { useParticipant, useParticipantProps } from "@/hooks/useParticipant";
import { FiClock, FiMapPin, FiShoppingCart } from "react-icons/fi";
import { maskPrice } from "@/helpers/mask";

const ticketsData = [
    {
        "ticket": {
            "id": 1,
            "name": "Área Vip - 1° Lote",
            "description": "Piso térreo localizado na quadra,  em pé em frente ao palco, com mesas bistrô espalhadas pelo espaço.",
            "service_charge": 1800,
            "available_until": "2024-01-02T16:13:58.860Z",
            "price": 10350,
            "available_quantity": 100,
            "max_per_purchase": 8
        },
        "quantity": "3"
    },
    {
        "ticket": {
            "id": 2,
            "name": "Área Vip - 2° Lote",
            "description": "Piso térreo localizado na quadra,  em pé em frente ao palco, com mesas bistrô espalhadas pelo espaço.",
            "service_charge": 1800,
            "available_until": "2024-01-02T16:13:58.860Z",
            "price": 13250,
            "available_quantity": 100,
            "max_per_purchase": 8
        },
        "quantity": "2"
    },
    {
        "ticket": {
            "id": 3,
            "name": "Área Vip - 3° Lote",
            "description": "Piso térreo localizado na quadra,  em pé em frente ao palco, com mesas bistrô espalhadas pelo espaço.",
            "service_charge": 1800,
            "available_until": "2024-01-02T16:13:58.860Z",
            "price": 20350,
            "available_quantity": 100,
            "max_per_purchase": 8
        },
        "quantity": "1"
    }
]

export default function CheckoutPage({ params }: { params: { id: Array<string> } }) {
    const event = events.find(item => item.id == +params.id[params.id.length - 1]);
    const [participants, setParticipants] = useState<useParticipantProps[]>([]);
    const participant = useParticipant();
    const [tickets, setTickets] = useState([]);

    const hydrate = () => {
        const newParticipants = [];
        ticketsData.forEach(item => {
            for (let i = 0; i < +item.quantity; i++) {
                newParticipants.push(participant);
            }
        });
        setParticipants(newParticipants);
    }

    useEffect(() => {
        const tickets = []
        ticketsData.map(item => {
            for (let i = 0; i < +item.quantity; i++) {
                tickets.push(item.ticket);
            }
        });
        setTickets(tickets);
        hydrate();
    }, []);

    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <section className="w-full max-w-8xl mx-auto grid grid-cols-12 gap-6 py-12">
                <div className="col-span-8">
                    <div className="flex flex-col border-b pb-6">
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
                            <span className="text-base font-medium text-gray-3">{event?.address}</span>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-6">
                        <strong className="font-semibold text-xl">Informação do participante</strong>
                        {participants.map((item, index) => (
                            <div className="grid grid-cols-2 gap-6 border-b pb-6">
                                <div className="col-span-2">
                                    <span className="font-medium text-gray-7">Ingresso n° {index + 1}: <strong className="text-gray-3">{tickets[index].name}</strong></span>
                                </div>
                                <InputText title="Nome" placeholder="Insira o nome do participante" />
                                <InputText title="Sobrenome" placeholder="Insira o sobrenome do participante" />
                                <InputText title="Email" placeholder="Insira o email do participante" />
                                <InputText title="CPF" placeholder="Insira o CPF do participante" />
                                <InputText title="Data de nascimento" type="date" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-4 relative">
                    <div className="sticky top-24 w-full border rounded-md">
                        <div className="h-12 w-full bg-secondary text-white font-semibold rounded-t-md flex items-center justify-between px-3">
                            <span>Resumo</span>
                            <div className="flex items-center gap-3">
                                <FiShoppingCart size={24} />
                                <span>R$ 1.400,00</span>
                            </div>
                        </div>
                        {ticketsData.map(item => (
                            <div className="flex justify-between items-center border-b gap-4 p-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-gray-3">{item.ticket.name}</span>
                                    <span className="text-sm font-medium text-gray-500">R$ {maskPrice((+item.quantity * item.ticket.price).toString())} (+ R$ {maskPrice((+item.quantity * item.ticket.service_charge).toString())} taxa)</span>
                                    <span className="text-xs font-light text-gray-6">Vendas até 26/01/2024</span>
                                </div>
                                <span>{item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}