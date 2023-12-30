'use client'

import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';
import { categories } from '@/utils/categories';
import 'swiper/css';
import { events } from '@/utils/events';
import { CardEvent } from '@/components/cards/card-event';
import { CardEventLarge } from '@/components/cards/card-event-large';
import { Header } from '@/components/header';
import { CategoriesHome } from '@/components/sections/categories-home';
import { EventsSwiper } from '@/components/sections/events-swiper';
import { FeaturedEvents } from '@/components/sections/featured-events-swiper';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="flex flex-col gap-16">
      <Header />
      <CategoriesHome />
      <EventsSwiper title='Eventos mais vistos nas últimas 24h 👀' events={events}/>
      <FeaturedEvents />
      <EventsSwiper title='Vistos recentemente' events={events}/>
      <Footer />
    </main>
  )
}
