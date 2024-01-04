import { events } from "@/utils/events";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import { CardEventLarge } from "../cards/card-event-large";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

export function FeaturedEvents() {
    const [swiper, setSwiper] = useState(null);
    const [start, setStart] = useState(true);
    const [end, setEnd] = useState(false);

    return (
        <section className='w-full max-w-8xl mx-auto flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h4 className='text-xl font-semibold text-gray-3'>Eventos em destaque no Ingressos Fast</h4>
                <div className='flex gap-2'>
                    <button onClick={() => swiper.slidePrev()} disabled={start} className={`disabled:opacity-30 flex items-center justify-center border border-primary text-primary h-8 w-8 rounded`}><FiChevronLeft /></button>
                    <button onClick={() => swiper.slideNext()} disabled={end} className='disabled:opacity-30 flex items-center justify-center border border-primary text-primary h-8 w-8 rounded'><FiChevronRight /></button>
                </div>
            </div>
            <Swiper
                navigation
                pagination={{ clickable: true }}
                className='w-full'
                slidesPerView={'auto'}
                onSwiper={setSwiper}
                onSlideChange={s => {
                    setEnd(s.isEnd)
                    setStart(s.isBeginning)
                }}
                modules={[Pagination]}
            >
                {events.map(item => (
                    <SwiperSlide className={'swiper-slide-full'} key={item.id}>
                        <CardEventLarge {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}