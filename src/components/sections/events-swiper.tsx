import { Swiper, SwiperSlide } from "swiper/react";
import { CardEvent } from "../cards/card-event";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

export function EventsSwiper({ title, events }: { title: string, events: Array<any> }) {
    const [swiper, setSwiper] = useState(null);
    const [start, setStart] = useState(true);
    const [end, setEnd] = useState(false);

    return (
        <section className='w-full max-w-8xl mx-auto flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h4 className='text-xl font-semibold text-gray-3'>{title}</h4>
                <div className='flex gap-2'>
                    <button onClick={() => swiper.slidePrev()} disabled={start} className={`disabled:opacity-30 flex items-center justify-center border border-primary text-primary h-8 w-8 rounded`}><FiChevronLeft /></button>
                    <button onClick={() => swiper.slideNext()} disabled={end} className='disabled:opacity-30 flex items-center justify-center border border-primary text-primary h-8 w-8 rounded'><FiChevronRight /></button>
                </div>
            </div>
            <Swiper
                navigation
                pagination
                className='w-full'
                slidesPerView={'auto'}
                onSwiper={setSwiper}
                onSlideChange={s => {
                    setEnd(s.isEnd)
                    setStart(s.isBeginning)
                }}
            >
                {events.map(item => (
                    <SwiperSlide key={item.id}>
                        <CardEvent {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}