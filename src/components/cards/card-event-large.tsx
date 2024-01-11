import { IParty } from "@/models/party.model";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import slugify from "slugify";

interface Props {
    id: number | string;
    name: string;
    image: string;
    address: string;
    date: Array<string>;
}

export function CardEventLarge({ name, logo, address, date_final, date_initial, id }: IParty) {
    const start = new Date(date_initial.date);
    const end = new Date(date_final.date);

    return (
        <div className="flex gap-3">
            <div className="w-full lg:w-1/2 h-[200px] lg:h-[390px] overflow-hidden relative rounded-md">
                <Image src={'https://images.ingressosfast.com.br/' + logo} alt={name} fill className="object-cover h-full w-full" />
            </div>
            <div className="hidden flex-1 lg:flex flex-col gap-2 p-3 justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center text-base text-primary font-semibold">
                        <div className="flex items-center gap-2">
                            <span>{start.toLocaleDateString()}</span>
                            <span><FiChevronRight /></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{end.toLocaleDateString()}</span>
                        </div>
                    </div>
                    <h4 className="text-4xl font-medium line-clamp-2">{name}</h4>
                    <span className="text-base text-gray-7">{address.name} - {address.city}, {address.state}</span>
                </div>
                <Link href={`/evento/${slugify(name, { lower: true })}/${id}`} className="h-12 px-8 border-2 border-primary text-base font-semibold text-primary w-fit rounded-md flex items-center">Ver detalhes</Link>
            </div>
        </div>
    )
}