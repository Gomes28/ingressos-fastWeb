import { fetchData } from "@/hooks/fetch";
import { CheckoutContent } from "./content";
import { SelectedTickets } from "@/components/sections/tickets-table";

export default async function CheckoutPage({ params }: { params: { id: Array<string> } }) {
    const id = params.id[params.id.length - 1];
    const res = await fetchData(`user/reservation/${id}/checkout`, 0);

    if (!res.Reservation) {
        return (
            <div className="w-full max-w-8xl mx-auto py-8">
                <span className="px-8 py-2 rounded-md bg-gray-100 text-gray-700 font-medium">Reserva não foi encontrada.</span>
            </div>
        )
    }

    const selectedTickets: Array<SelectedTickets> = res.Reservation.ticket.map(item => {
        const selectedTicket: SelectedTickets = {
            quantity: item.Quantity_Sell,
            ticket: {
                id: item.id,
                type: item.Type,
                value: item.Value,
                buy_Final: item.Buy_Final,
                buy_Initial: item.Buy_Initial,
            }
        }
        return selectedTicket;
    });

    return (
        <CheckoutContent params={params} selectedTickets={selectedTickets} event={res.Reservation.Party} expiredAt={res.Reservation.expired_at} />
    )
}