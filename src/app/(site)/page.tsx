import 'swiper/css';
import 'swiper/css/pagination';
import { events } from '@/utils/events';
import { CategoriesHome } from '@/components/sections/categories-home';
import { EventsSwiper } from '@/components/sections/events-swiper';
import { FeaturedEvents } from '@/components/sections/featured-events-swiper';
import { Footer } from '@/components/footer';
import { FiSearch } from 'react-icons/fi';
import { fetchData } from '@/hooks/fetch';
import { IParty } from '@/models/party.model';

export default async function Home() {
  const {partys}: {partys: Array<IParty>} = await fetchData('party/list');

  return (
    <main className="flex flex-col lg:gap-16 gap-8 mt-8">
      <div className='lg:hidden flex gap-3 px-3'>
        <div className="flex flex-1 w-full px-3 h-14 border items-center rounded-md gap-3">
          <input
            type="text"
            placeholder="Buscar eventos, shows, espetáculos, cursos..."
            className="w-full outline-none overflow-hidden text-ellipsis"
          />
        </div>
        <button className='w-14 h-14 bg-primary text-white rounded-md flex items-center justify-center'><FiSearch size={20} /></button>
      </div>
      <CategoriesHome />
      <EventsSwiper title='Eventos mais vistos nas últimas 24h 👀' events={partys} />
      <FeaturedEvents events={partys}/>
      <EventsSwiper title='Vistos recentemente' events={partys} />
      <Footer />
    </main>
  )
}
