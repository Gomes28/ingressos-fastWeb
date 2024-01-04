'use client'

import { InputText } from "@/components/form-components/input-text";
import { Header } from "@/components/header";
import { events } from "@/utils/events";
import { useEffect, useState } from "react";
import { useParticipant, useParticipantProps } from "@/hooks/useParticipant";
import { FiClock, FiMapPin, FiShoppingCart } from "react-icons/fi";
import { maskCpf, maskPrice } from "@/helpers/mask";
import { ButtonPrimary } from "@/components/buttons/button-primary";
import { Clock } from "@/components/clock";

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
        "quantity": "1"
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
    const [names, setNames] = useState<Array<string>>([]);
    const [surnames, setSurnames] = useState<Array<string>>([]);
    const [emails, setEmails] = useState<Array<string>>([]);
    const [cpfs, setCpfs] = useState<Array<string>>([]);
    const [birthDates, setBirthDates] = useState<Array<string>>([]);
    const [tickets, setTickets] = useState([]);
    const [total, setTotal] = useState(0);

    const hydrate = () => {
        const newParticipants = [];
        const names = [];
        const emails = [];
        const surnames = [];
        const cpfs = [];
        const birthDates = [];

        ticketsData.forEach(item => {
            for (let i = 0; i < +item.quantity; i++) {
                const newParticipant = participant;
                newParticipants.push(newParticipant);
                names.push('');
                surnames.push('');
                emails.push('');
                cpfs.push('');
                birthDates.push('');
            }
        });

        setNames(names);
        setSurnames(surnames);
        setEmails(emails);
        setBirthDates(birthDates);
        setCpfs(cpfs);
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
        let total = 0;
        ticketsData.forEach(item => {
            total = total + (+item.quantity) * (item.ticket.price + item.ticket.service_charge);
        });
        setTotal(total);
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
                            <div className="grid grid-cols-2 gap-6 border p-6 bg-gray-50 rounded-md" key={index}>
                                <div className="col-span-2">
                                    <span className="font-medium text-gray-3">Ingresso n° {index + 1}: <strong className="text-primary">{tickets[index].name}</strong></span>
                                </div>
                                <InputText
                                    title="Nome completo"
                                    placeholder="Insira o nome do participante"
                                    value={names[index]}
                                    onChange={(e) => {
                                        const values = [...names];
                                        values[index] = e.target.value;
                                        setNames(values);
                                    }}
                                />
                                <InputText
                                    title="Email"
                                    placeholder="Insira o email do participante"
                                    value={emails[index]}
                                    onChange={(e) => {
                                        const values = [...emails];
                                        values[index] = e.target.value;
                                        setEmails(values);
                                    }}
                                />
                                <InputText
                                    title="CPF"
                                    placeholder="Insira o CPF do participante"
                                    value={cpfs[index]}
                                    onChange={(e) => {
                                        const values = [...cpfs];
                                        values[index] = maskCpf(e.target.value);
                                        setCpfs(values);
                                    }}
                                />
                                <InputText
                                    title="Data de nascimento"
                                    type="date"
                                    value={birthDates[index]}
                                    onChange={(e) => {
                                        const values = [...birthDates];
                                        values[index] = e.target.value;
                                        setBirthDates(values);
                                    }}
                                />
                            </div>
                        ))}
                        <div className="border border-primary rounded-md overflow-hidden">
                            <div className="bg-gray-100 px-4 py-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-base">Dados do cartão</span>
                                    <span className="text-sm text-primary">Parcele em até 12x</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-2 flex">
                                        <InputText title="Nome impresso no cartão" />
                                    </div>
                                    <div className="col-span-2 flex">
                                        <InputText title="Número do cartão" />
                                    </div>
                                    <div className="col-span-1 flex">
                                        <InputText title="Data de validade" placeholder="00/00" />
                                    </div>
                                    <div className="col-span-1 flex">
                                        <InputText title="Código de segurança" placeholder="000" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <span>Ao prosseguir, você declara estar ciente dos Termos e Políticas</span>
                        <ButtonPrimary title="Continuar" />
                    </div>
                </div>
                <div className="col-span-4 relative">
                    <div className="sticky top-24 w-full">
                        <div className="w-full border rounded-md">
                            <div className="h-12 w-full bg-secondary text-white font-semibold rounded-t-md flex items-center justify-between px-3">
                                <span>Resumo</span>
                                <div className="flex items-center gap-3">
                                    <FiShoppingCart size={24} />
                                    <span>R$ {maskPrice(total.toString())}</span>
                                </div>
                            </div>
                            {ticketsData.map((item, index) => (
                                <div className="flex justify-between items-center border-b gap-4 p-4" key={index}>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-gray-3">{item.ticket.name}</span>
                                        <span className="text-sm font-medium text-gray-500">R$ {maskPrice((+item.quantity * item.ticket.price).toString())} (+ R$ {maskPrice((+item.quantity * item.ticket.service_charge).toString())} taxa)</span>
                                        <span className="text-xs font-light text-gray-6">Vendas até 26/01/2024</span>
                                    </div>
                                    <span>{item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <Clock />
                    </div>
                </div>
            </section>
        </main>
    )
}