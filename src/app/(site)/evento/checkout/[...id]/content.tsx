'use client'

import { InputText } from "@/components/form-components/input-text";
import { useEffect, useState } from "react";
import { useParticipant, useParticipantProps } from "@/hooks/useParticipant";
import { FiClock, FiCreditCard, FiMapPin, FiShoppingCart } from "react-icons/fi";
import { FaPix } from "react-icons/fa6";
import { maskCpf, maskNumber, maskPrice } from "@/helpers/mask";
import { ButtonPrimary } from "@/components/buttons/button-primary";
import { Clock } from "@/components/clock";
import { SelectedTickets } from "@/components/sections/tickets-table";
import { IParty } from "@/models/party.model";
import { api } from "@/services/api.service";
import { toNumber } from "vanilla-masker";
import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import axios from "axios";

export function CheckoutContent({ params, selectedTickets, event, expiredAt }: { params: { id: Array<string> }, selectedTickets: Array<SelectedTickets>, event: IParty, expiredAt: string }) {
    const router = useRouter();

    const [participants, setParticipants] = useState<useParticipantProps[]>([]);
    const participant = useParticipant();

    const [names, setNames] = useState<Array<string>>([]);
    const [errorNames, setErrorNames] = useState<Array<string | null>>([]);

    const [surnames, setSurnames] = useState<Array<string>>([]);

    const [emails, setEmails] = useState<Array<string>>([]);
    const [errorEmails, setErrorEmails] = useState<Array<string | null>>([]);

    const [cpfs, setCpfs] = useState<Array<string>>([]);
    const [errorCpfs, setErrorCpfs] = useState<Array<string | null>>([]);

    const [birthDates, setBirthDates] = useState<Array<string>>([]);

    const [tickets, setTickets] = useState([]);
    const [total, setTotal] = useState(0);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addressValid, setAddressValid] = useState(false);


    const numberCard = useForm('numberCard');
    const codeCard = useForm('codeCard');
    const expiredCard = useForm('expiredCard');

    const name = useForm();
    const email = useForm();
    const cpf = useForm('cpf');
    const birth = useForm();
    const phone = useForm('phone');
    const street = useForm();
    const number = useForm();
    const neighborhood = useForm();
    const zipcode = useForm('cep');
    const city = useForm();
    const complement = useForm();
    const state = useForm();
    const district = useForm();
    const route = useForm();


    const hydrate = () => {
        const newParticipants = [];
        const names = [];
        const errorNames = [];
        const emails = [];
        const errorEmails = [];
        const surnames = [];
        const cpfs = [];
        const errorCpfs = [];
        const birthDates = [];

        selectedTickets.forEach(item => {
            for (let i = 0; i < +item.quantity; i++) {
                const newParticipant = participant;
                newParticipants.push(newParticipant);
                names.push('');
                errorNames.push(null);
                surnames.push('');
                emails.push('');
                errorEmails.push(null);
                cpfs.push('');
                errorCpfs.push(null);
                birthDates.push('');
            }
        });

        setNames(names);
        setErrorNames(errorNames);

        setSurnames(surnames);

        setEmails(emails);
        setErrorEmails(errorEmails);

        setBirthDates(birthDates);

        setCpfs(cpfs);
        setErrorCpfs(errorCpfs);

        setParticipants(newParticipants);
    }

    const validate = (errors, setErrors, values) => {
        let isValid = true;
        const valuesErrors = [...errors];
        values.forEach((item, index) => {
            if (item == null || item == '') {
                valuesErrors[index] = 'Insira um valor.';
                isValid = false;
            } else {
                valuesErrors[index] = null;
            }
        });
        setErrors(valuesErrors);
        console.log(isValid);
        return isValid;
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            { error && setError(null) }
            if (
                validate(errorNames, (e) => setErrorNames(e), names) &&
                validate(errorEmails, (e) => setErrorEmails(e), emails) &&
                validate(errorCpfs, (e) => setErrorCpfs(e), cpfs)
            ) {
                const res = await api.post('user/buy/create', {
                    reservation_id: params.id,
                    type_payment: type == 0 ? 'card' : "pix",
                    email_received_tickets: "nascimento.gomes@icloud.com",
                    party_id: event.id,
                    ticket_owners: names.map((_, index) => {
                        return {
                            "ticket_data": {
                                "ticket_id": tickets[index].id,
                                "cpf": toNumber(cpfs[index]),
                                "name": names[index],
                                "email": emails[index]
                            }
                        }
                    }),
                    card_data: type == 0 ? {
                        name: name.value,
                         cpf: maskNumber(cpf.value),
                         email: email.value,
                         birth: birth.value,
                         phone_number: phone.value,
                         payment_token: "",
                         installments: 1,
                         // installments e a quantidade de parcelas do cartão
                         "billing_address": {
                           "street": street.value,
                           "number": number.value,
                           "neighborhood": district.value,
                           "zipcode": zipcode.value,
                           "city": city.value,
                           "complement": complement.value,
                           "state": state.value
                         }
                     } : null,
                   
                }).then(res => res.data);

                console.log(res);

                if (res?.Buy?.reference_id) {
                    type == 1 && router.push(`/evento/checkout/buy/${res?.Buy?.reference_id}`);
                } else {
                    throw new Error('Erro ao realizar compra, tente novamente ou entre em contato.');
                }

            } else {
                throw new Error('Preencha todos os dados antes de prosseguir.');
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const findAddress = async () => {
        try {
            const res = await axios.get(`https://viacep.com.br/ws/${maskNumber(zipcode.value)}/json/`).then(res => res.data);
            if (res) {
                { res.localidade && city.setValue(res.localidade) }
                { res.bairro && district.setValue(res.bairro) }
                { res.uf && state.setValue(res.uf) }
                { res.logradouro && route.setValue(res.logradouro) }
                setAddressValid(true);
            } else {
                setAddressValid(false);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        const tickets = []
        selectedTickets.map(item => {
            for (let i = 0; i < +item.quantity; i++) {
                tickets.push(item.ticket);
            }
        });
        setTickets(tickets);
        hydrate();
        let total = 0;
        selectedTickets.forEach(item => {
            total = total + (+item.quantity) * (item.ticket.price + 0);
        });
        setTotal(total);
    }, []);

    return (
        <main className="min-h-screen flex flex-col">
            <section className="w-full max-w-8xl mx-auto max-lg:px-3 grid grid-cols-12 gap-6 py-12">
                <div className="col-span-12 lg:col-span-8">
                    <div className="flex flex-col border-b pb-6">
                        <h2 className="text-2xl font-bold text-gray-3 capitalize">{event?.name}</h2>
                        <div className="flex gap-4 mt-4">
                            <span className="flex mt-1 text-gray-4">
                                <FiClock />
                            </span>
                            <div className="flex flex-col">
                                <span className="text-base font-medium text-gray-3">Sábado e Domingo às 15h00</span>
                                <span className="text-sm font-light text-gray-4">27 a 28 de Janeiro</span>
                            </div>
                        </div>
                        {event?.address && <div className="flex gap-4 mt-4">
                            <span className="flex mt-1 text-gray-4">
                                <FiMapPin />
                            </span>
                            <span className="text-base font-medium text-gray-3">{event.address.name}, {event.address.street} - {event.address.city}, {event.address.state}</span>
                        </div>}
                        <div className="flex lg:hidden mt-8">
                            <AsideCheckout total={total} selectedTickets={selectedTickets} expiredAt={expiredAt} />
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-6">
                        <strong className="font-semibold text-xl">Informação do participante</strong>
                        {participants.map((item, index) => (
                            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 border p-6 bg-gray-50 rounded-md" key={index}>
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
                                    error={errorNames[index]}
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
                                    error={errorEmails[index]}
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
                                    error={errorCpfs[index]}
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
                        <div className="flex flex-col gap-4">
                            <strong className="font-semibold text-xl">Informações de pagamento</strong>
                            <ul className="flex flex-col gap-2 w-fit">
                                <li className="flex-1">
                                    <button className={`w-full flex items-center gap-4 ${type == 0 ? 'bg-gray-100' : 'bg-transparent'} py-3 px-6 rounded-md`} onClick={() => setType(0)}>
                                        <div className={`h-5 w-5 border-2 ${type == 0 ? 'border-blue-500' : 'border-gray-600'} rounded-full flex items-center justify-center`}>
                                            {type == 0 && <div className="h-3 w-3 bg-blue-500 rounded-full"></div>}
                                        </div>
                                        <FiCreditCard size={24} />
                                        <span className="font-medium">Cartão de crédito</span>
                                        <span className="text-xs font-medium bg-blue-100 text-blue-600 py-1 px-2 rounded-md">Parcele em até 12x</span>
                                    </button>
                                </li>
                                <li className="flex-1">
                                    <button className={`w-full flex items-center gap-4 ${type == 1 ? 'bg-gray-100' : 'bg-transparent'} py-3 px-6 rounded-md`} onClick={() => setType(1)}>
                                        <div className={`h-5 w-5 border-2 ${type == 1 ? 'border-blue-500' : 'border-gray-600'} rounded-full flex items-center justify-center`}>
                                            {type == 1 && <div className="h-3 w-3 bg-blue-500 rounded-full"></div>}
                                        </div>
                                        <FaPix size={24} />
                                        <span className="font-medium">Pix</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {type == 0 && <div className="border border-primary rounded-md overflow-hidden">
                            <div className="bg-gray-100 px-4 py-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-base">Dados do cartão</span>
                                    <span className="text-sm text-primary">Parcele em até 12x</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 p-4">
                                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4">
                                    <div className="col-span-2 flex">
                                        <InputText title="Nome impresso no cartão" placeholder="Insira o nome impresso no cartão" {...name} />
                                    </div>
                                    <div className="col-span-2 flex">
                                        <InputText title="Número do cartão" placeholder="Insira o número do cartão" {...numberCard}/>
                                    </div>
                                    <div className="col-span-1 flex">
                                        <InputText title="Data de validade" placeholder="00/00" {...expiredCard} />
                                    </div>
                                    <div className="col-span-1 flex">
                                        <InputText title="Código de segurança" placeholder="000" {...codeCard} />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 border-t pt-4">
                                    <div className="col-span-2 flex">
                                        <InputText title="Email" placeholder="Insira seu email" {...email} />
                                    </div>
                                    <div className="col-span-2 flex">
                                        <InputText title="Cpf" placeholder="Insira seu CPF" {...cpf} />
                                    </div>
                                    <div className="col-span-1 flex">
                                        <InputText title="Telefone" placeholder="(00) 00000-0000" {...phone} />
                                    </div>
                                    <div className="col-span-1 flex">
                                        <InputText title="Data Nascimento" type="date" {...birth} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 border-t pt-4">
                                        <div className="col-span-1 flex">
                                            <InputText title="Cep" placeholder="00000-000" {...zipcode} onBlur={findAddress} />
                                        </div>
                                    </div>
                                    {addressValid &&
                                        <>
                                            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
                                                <InputText title="Estado" {...state} />
                                                <InputText title="Cidade" {...city} />
                                                <InputText title="Bairro" {...district} />
                                            </div>
                                            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
                                                <InputText title="Rua" {...route} />
                                                <InputText title="Complemento" />
                                            </div>
                                            <div className="flex flex-col lg:grid lg:grid-cols-6 gap-4">
                                                <InputText title="Número" placeholder="" />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="flex max-lg:flex-col justify-between lg:items-center mt-6 gap-4">
                        <span>Ao prosseguir, você declara estar ciente dos Termos e Políticas</span>
                        <div className="w-fit max-lg:w-full">
                            <ButtonPrimary title="Continuar" full={true} onClick={handleSubmit} loading={loading} />
                        </div>
                    </div>
                    {error != null && <span className="flex px-4 py-2 bg-red-100 text-red-500 w-fit rounded-md font-medium mt-4">{error}</span>}
                </div>
                <div className="hidden lg:flex h-full col-span-4 relative">
                    <AsideCheckout total={total} selectedTickets={selectedTickets} expiredAt={expiredAt} />
                </div>
            </section>
        </main>
    )
}

function AsideCheckout({ total, selectedTickets, expiredAt }) {
    const router = useRouter();
    return (
        <div className="sticky top-24 w-full">
            <div className="w-full border rounded-md">
                <div className="h-12 w-full bg-secondary text-white font-semibold rounded-t-md flex items-center justify-between px-3">
                    <span>Resumo</span>
                    <div className="flex items-center gap-3">
                        <FiShoppingCart size={24} />
                        <span>R$ {maskPrice(total.toString())}</span>
                    </div>
                </div>
                {selectedTickets.map((item, index) => (
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
            {expiredAt && <Clock expiredAt={expiredAt} onFinish={() => router.refresh()} />}
        </div>
    )
}
