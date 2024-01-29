'use client'

import { maskPrice } from "@/helpers/mask";
import { ITicket } from "@/models/party.model";
import { api } from "@/services/api.service";
import { payments } from "@/utils/payments";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { FiLock } from "react-icons/fi";

export interface Ticket {
    id: number,
    name: string,
    description: string,
    service_charge: number,
    available_until: Date | string,
    price: number,
    available_quantity: number,
    max_per_purchase: number
};

export interface SelectedTickets {
    ticket: ITicket;
    quantity: number;
}

export function TicketsTable({ tickets, event }: { tickets: ITicket[], event }) {
    const router = useRouter();
    const [selectedTickets, setSelectedTickets] = useState<SelectedTickets[]>([]);
    const [total, setTotal] = useState(0);

    const selectQuantity = (ticket, quantity) => {
        const exist = selectedTickets.find(item => item.ticket.id == ticket.id);
        if (exist) {
            const values = selectedTickets.map<SelectedTickets>(item => {
                if (item.ticket.id == ticket.id) {
                    return {
                        quantity: +quantity,
                        ticket: ticket
                    }
                } else {
                    return item;
                }
            });
            setSelectedTickets(values);
        } else {
            setSelectedTickets(old => [...old, { ticket, quantity }]);
        }
    }

    const handleSubmit = async () => {
        try {
            const { 'access_token': token } = parseCookies();

            if (selectedTickets.length == 0) {
                return alert('Selecione os ingressos.');
            }

            if(!token) {
                return router.push('/entrar');
            }

            const res = await api.post('user/reservation/create', selectedTickets.map(item => {
                return {
                    ticket_id: item.ticket.id,
                    quantity: item.quantity
                }
            })).then(res => res.data);

            if (res.Reservation) {
                router.push(`/evento/checkout/${res.Reservation.reference_id}`);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        let total = 0;
        selectedTickets.forEach(item => {
            total = total + item.quantity * (item.ticket.price + 0);
        });
        setTotal(total);
    }, [selectedTickets]);

    return (
        <div id="tickets" className="w-full max-w-8xl mx-auto flex flex-col py-12 max-md:px-3">
            <h2 className="text-2xl font-bold text-gray-3 mb-6">Ingressos</h2>
            <div className="border rounded-md max-md:hidden">
                <div className="grid grid-cols-12 px-3 py-3 gap-4 border-b text-sm">
                    <div className="col-span-7">
                        <span>Ingressos</span>
                    </div>
                    <div className="col-span-1">
                        <span>Valor Un.</span>
                    </div>
                    <div className="col-span-2">
                        <span>Quantidade</span>
                    </div>
                    <div className="col-span-2">
                        <span>Total</span>
                    </div>
                </div>
                {tickets.length == 0 && <span className="p-3 flex text-sm font-medium">Nenhum ingresso disponível</span>}
                {tickets.map((ticket, index) => {
                    const date = new Date(ticket.buy_Initial);
                    const [day, month, year] = date.toLocaleDateString().split('/');
                    const values = [];
                    const selected = selectedTickets.find(item => item.ticket.id == ticket.id);
                    const total = selected ? (selected.quantity * (ticket.price + 0)).toString() : '000';
                    for (let i = 0; i <= 8; i++) {
                        values.push(i);
                    }
                    return (
                        <div key={ticket.id} className={`${index % 2 == 0 && 'bg-gray-100'} grid grid-cols-12 px-3 py-3 gap-4 ${index < tickets.length - 1 && 'border-b'} text-sm text-gray-5`}>
                            <div className="col-span-7 flex flex-col">
                                <div className="flex gap-4 items-center">
                                    <h4 className="text-base font-medium text-gray-3">{ticket.name}</h4>
                                    <div className="w-[6px] h-[6px] rounded-lg bg-black/30" />
                                    <span className="text-black/60 text-sm">Taxa de serviço R$ 0,00</span>
                                    <div className="w-[6px] h-[6px] rounded-lg bg-black/30" />
                                    <span className="text-black/60 text-sm">Disponível até {day}/{month} às {date.getHours()}:{date.getMinutes()}</span>
                                </div>
                                <p className="text-xs">Uma pequena descrição</p>
                                {/* <p className="text-xs">{ticket.description}</p> */}
                            </div>
                            <div className="col-span-1 flex items-center">
                                <span>R$ {maskPrice(ticket.price.toString())}</span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <div className="h-12 w-20 px-3 rounded-md bg-white flex items-center border">
                                    <select name="select" className="w-full outline-none h-full" onChange={e => selectQuantity(ticket, e.target.value)}>
                                        {values.map(item => <option value={item} key={item}>{item}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <span className="font-semibold text-gray-2">R$ {maskPrice(total)}</span>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
            <div className="border rounded-md md:hidden">
                <div className="grid grid-cols-12 px-3 py-3 gap-4 border-b text-sm">
                    <div className="col-span-9">
                        <span>Ingressos</span>
                    </div>
                    <div className="col-span-3">
                        <span>Quant.</span>
                    </div>
                </div>
                {tickets.length == 0 && <span className="p-3 flex text-sm font-medium">Nenhum ingresso disponível</span>}
                {tickets.map((ticket, index) => {
                    const date = new Date(ticket.buy_Final);
                    const [day, month, year] = date.toLocaleDateString().split('/');
                    const values = [];
                    const selected = selectedTickets.find(item => item.ticket.id == ticket.id);
                    const total = selected ? (selected.quantity * (ticket.price + 0)).toString() : '000';
                    for (let i = 0; i <= 8; i++) {
                        values.push(i);
                    }
                    return (
                        <div key={ticket.id} className={`${index % 2 == 0 && 'bg-gray-100'} grid grid-cols-12 px-3 py-3 gap-4 ${index < tickets.length - 1 && 'border-b'} text-sm text-gray-5`}>
                            <div className="col-span-9 flex flex-col">
                                <div className="flex gap-2 items-center flex-wrap mb-4">
                                    <h4 className="text-base font-medium text-gray-3">{ticket.name}</h4>
                                    <span className="text-black/60 text-sm">Taxa de serviço R$ {0}</span>
                                    <span className="text-black/60 text-sm">Disponível até {day}/{month} às {date.getHours()}:{date.getMinutes()}</span>
                                </div>
                                <p className="text-xs">Uma pequena descrição</p>
                                {/* <p className="text-xs">{ticket.description}</p> */}
                            </div>
                            <div className="col-span-3 flex items-center">
                                <div className="h-12 w-20 px-3 rounded-md bg-white flex items-center border">
                                    <select name="select" className="w-full outline-none h-full bg-white" onChange={e => selectQuantity(ticket, e.target.value)}>
                                        {values.map(item => <option value={item} key={item}>{item}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
            <div className="border rounded-md mt-6 max-md:hidden">
                <div className="grid grid-cols-12 px-3 py-3 gap-4 border-b text-sm">
                    <div className="col-span-9 flex items-center">
                        <span className="text-gray-5">Subtotal R$ {maskPrice(total.toString())}</span>
                    </div>
                    <div className="col-span-1">
                        <span className="text-lg font-semibold">Total</span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-lg font-semibold">R$ {maskPrice(total.toString())}</span>
                    </div>
                </div>
                <div className="grid grid-cols-12 px-3 py-3 gap-4 text-sm">
                    <div className="col-span-8 flex flex-col">
                        <span className="text-gray-5">Formas de pagamento</span>
                        <div className="flex gap-2 mt-2">
                            {payments.map(item => <img src={item.image} alt="" key={item.id} />)}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <span className="text-lg font-semibold"></span>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <button onClick={handleSubmit} disabled={tickets.length == 0 || selectedTickets.length == 0} className="h-12 px-8 bg-primary disabled:opacity-25 text-white rounded-md text-base font-medium flex gap-4 items-center"><FiLock />Comprar</button>
                    </div>
                </div>
            </div>
            <div className="border rounded-md mt-6 md:hidden">
                <div className="flex flex-col px-3 py-3 gap-4 border-b text-sm">
                    <div className="col-span-9 flex items-center">
                        <span className="text-gray-5">Subtotal R$ {maskPrice(total.toString())}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="col-span-1">
                            <span className="text-lg font-semibold">Total</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-lg font-semibold">R$ {maskPrice(total.toString())}</span>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <button onClick={handleSubmit} disabled={tickets.length == 0 || selectedTickets.length == 0} className="h-12 w-full px-8 bg-primary disabled:opacity-25 text-white rounded-md text-base font-medium flex gap-4 items-center"><FiLock />Comprar</button>
                    </div>
                </div>
                <div className="grid grid-cols-12 px-3 py-3 gap-4 text-sm bg-gray-100">
                    <div className="col-span-12 flex flex-col">
                        <span className="text-gray-5">Formas de pagamento</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {payments.map(item => <img src={item.image} alt="" key={item.id} />)}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <span className="text-lg font-semibold"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}