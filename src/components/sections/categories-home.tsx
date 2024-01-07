import { categories } from "@/utils/categories";
import Image from "next/image";
import Link from "next/link";

export function CategoriesHome() {
    return (
        <section className='w-full max-w-8xl mx-auto'>
            <h4 className='text-xl font-semibold mb-4 text-gray-3'>Se joga, viver é agora!</h4>
            <div className='grid grid-cols-8 gap-6'>
                {categories.map(item => (
                    <Link key={item.id} href={`/eventos/${item.slug}`} className='flex flex-col border bg-gray-50 text-gray-3 px-3 py-4 items-center rounded-2xl gap-1 hover:shadow-md hover:bg-primary-light hover:border-primary hover:text-primary transition-all'>
                        <Image src={item.icon} alt='' width={48} height={48} />
                        <span className='text-center font-medium'>{item.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}