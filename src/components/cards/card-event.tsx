import { IParty } from "@/models/party.model";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import slugify from "slugify";

export interface IEvent {
    id: number | string;
    name: string;
    image: string;
    address: string;
    date: Array<string>;
}

export function CardEvent({ name, logo, address, date_final, date_initial, id }: IParty) {
    const start = new Date(date_initial.date);
    const end = new Date(date_final.date);

    return (
        <Link href={`/evento/${slugify(name, { lower: true })}/${id}`} className="flex flex-col gap-3 w-[307px]">
            <div className="w-full h-[148px] overflow-hidden relative rounded-md">
                <Image src={'https://images.ingressosfast.com.br/' + logo} alt={name} fill className="object-cover h-full w-full" />
            </div>
            <div className="flex flex-col gap-2 px-3">
                <div className="flex gap-2 items-center text-sm text-primary font-semibold">
                    <div className="flex items-center gap-2">
                        <span>{start.toLocaleDateString()}</span>
                        <span><FiChevronRight /></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>{end.toLocaleDateString()}</span>
                    </div>
                </div>
                <h4 className="text-lg font-medium line-clamp-2">{name}</h4>
                <span className="text-sm text-gray-7">{address.name} - {address.city}, {address.state}</span>
            </div>
        </Link>
    )
}