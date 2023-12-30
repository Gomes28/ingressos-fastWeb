import { events } from "@/utils/events";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardEvent } from "../cards/card-event";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function EventsSwiper({title, events}: {title: string, events: Array<any>}) {
    return (
        <section className='w-full max-w-8xl mx-auto flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h4 className='text-xl font-semibold text-gray-3'>{title}</h4>
                <div className='flex gap-2'>
                    <button className='flex items-center justify-center border border-primary text-primary h-8 w-8 rounded'><FiChevronLeft /></button>
                    <button className='flex items-center justify-center border border-primary text-primary h-8 w-8 rounded'><FiChevronRight /></button>
                </div>
            </div>
            <Swiper navigation className='w-full' slidesPerView={'auto'}>
                {events.map(item => (
                    <SwiperSlide key={item.id}>
                        <CardEvent {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}