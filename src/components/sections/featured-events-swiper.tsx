import { events } from "@/utils/events";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardEventLarge } from "../cards/card-event-large";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function FeaturedEvents() {
    return (
        <section className='w-full max-w-8xl mx-auto flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h4 className='text-xl font-semibold text-gray-3'>Eventos em destaque no Ingressos Fast</h4>
                <div className='flex gap-2'>
                    <button className='flex items-center justify-center border border-primary text-primary h-8 w-8 rounded'><FiChevronLeft /></button>
                    <button className='flex items-center justify-center border border-primary text-primary h-8 w-8 rounded'><FiChevronRight /></button>
                </div>
            </div>
            <Swiper navigation className='w-full' slidesPerView={'auto'}>
                {events.map(item => (
                    <SwiperSlide className={'swiper-slide-full'} key={item.id}>
                        <CardEventLarge {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}