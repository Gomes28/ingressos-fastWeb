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

export function CardEvent({ name, image, address, date, id }: Props) {
    return (
        <Link href={`/evento/${slugify(name, {lower: true})}/${id}`} className="flex flex-col gap-3 w-[307px]">
            <div className="w-full h-[148px] overflow-hidden relative rounded-md">
                <Image src={image} alt={name} fill />
            </div>
            <div className="flex flex-col gap-2 px-3">
                <div className="flex gap-2 items-center text-sm text-primary font-semibold">{date.map((item, index) => (
                    <>
                        <span key={item}>{item}</span>
                        {index < date.length - 1 && <span><FiChevronRight /></span>}
                    </>
                ))}</div>
                <h4 className="text-lg font-medium line-clamp-2">{name}</h4>
                <span className="text-sm text-gray-7">{address}</span>
            </div>
        </Link>
    )
}