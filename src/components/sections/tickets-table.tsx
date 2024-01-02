'use client'

import { maskPrice } from "@/helpers/mask";
import { payments } from "@/utils/payments";
import { useEffect, useState } from "react";
import { FiLock } from "react-icons/fi";

interface Ticket {
    id: number,
    name: string,
    description: string,
    service_charge: number,
    available_until: Date | string,
    price: number,
    available_quantity: number,
    max_per_purchase: number
};

interface SelectedTickets {
    ticket: Ticket;
    quantity: number;
}

export function TicketsTable({tickets}: {tickets: Ticket[]}) {
    const [selectedTickets, setSelectedTickets] = useState<SelectedTickets[]>([]);
    const [total, setTotal] = useState(0);

    const selectQuantity = (ticket, quantity) => {
        const exist = selectedTickets.find(item => item.ticket.id == ticket.id);
        if(exist) {
            const values = selectedTickets.map<SelectedTickets>(item => {
                if(item.ticket.id == ticket.id) {
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
            setSelectedTickets(old => [...old, {ticket, quantity}]);
        }
    }

    useEffect(() => {
        let total = 0;
        selectedTickets.forEach(item => {
            total = total + item.quantity * (item.ticket.price + item.ticket.service_charge);
        })
        setTotal(total);
    }, [selectedTickets]);

    return (
        <div id="tickets" className="w-full max-w-8xl mx-auto flex flex-col my-12">
            <h2 className="text-2xl font-bold text-gray-3 mb-6">Ingressos</h2>
            <div className="border rounded-md">
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
                {tickets.map((ticket, index) => {
                    const date = new Date(ticket.available_until);
                    const [day, month, year] = date.toLocaleDateString().split('/');
                    const values = [];
                    const selected = selectedTickets.find(item => item.ticket.id == ticket.id);
                    const total = selected ? (selected.quantity * (ticket.price + ticket.service_charge)).toString() : '000';
                    for (let i = 0; i <= ticket.max_per_purchase; i++) {
                        values.push(i);
                    }
                    return (
                        <div className={`${index % 2 == 0 && 'bg-gray-100'} grid grid-cols-12 px-3 py-3 gap-4 ${index < tickets.length - 1 && 'border-b'} text-sm text-gray-5`}>
                            <div className="col-span-7 flex flex-col">
                                <div className="flex gap-4 items-center">
                                    <h4 className="text-base font-medium text-gray-3">{ticket.name}</h4>
                                    <div className="w-[6px] h-[6px] rounded-lg bg-black/30" />
                                    <span className="text-black/60 text-sm">Taxa de serviço R$ {maskPrice(ticket.service_charge.toString())}</span>
                                    <div className="w-[6px] h-[6px] rounded-lg bg-black/30" />
                                    <span className="text-black/60 text-sm">Disponível até {day}/{month} às {date.getHours()}:{date.getMinutes()}</span>
                                </div>
                                <p className="text-xs">{ticket.description}</p>
                            </div>
                            <div className="col-span-1 flex items-center">
                                <span>R$ {maskPrice(ticket.price.toString())}</span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <div className="h-12 w-20 px-3 rounded-md bg-white flex items-center border">
                                    <select name="select" className="w-full outline-none h-full" onChange={e => selectQuantity(ticket, e.target.value)}>
                                        {values.map(item => <option value={item}>{item}</option>)}
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
            <div className="border rounded-md mt-6">
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
                        <button className="h-12 px-8 bg-primary text-white rounded-md text-base font-medium flex gap-4 items-center"><FiLock />Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}