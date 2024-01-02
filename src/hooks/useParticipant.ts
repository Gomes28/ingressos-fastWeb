import { useState } from "react";
import { useForm, useFormProps } from "./useForm";
import { Ticket } from "@/components/sections/tickets-table";

export interface useParticipantProps {
    name: useFormProps;
    surname: useFormProps;
    email: useFormProps;
    cpf: useFormProps;
    birthDate: useFormProps;
    ticket: Ticket;
    setTicket: (ticket: Ticket) => void;
}

export function useParticipant() {
    const name = useForm();
    const surname = useForm();
    const email = useForm();
    const cpf = useForm();
    const birthDate = useForm();
    const [ticket, setTicket] = useState<Ticket>(null);

    return {
        name, surname, email, cpf, birthDate, ticket, setTicket
    }
}