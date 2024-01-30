import { fetchData } from "@/hooks/fetch";
import BuyContent from "./content";

export default async function BuyPage({ params }: { params: { id: string } }) {
    const res = await fetchData(`user/buy/${params.id}/pix`);

    if (!res?.buy) {
        return (
            <div className="w-full max-w-8xl mx-auto py-8">
                <span className="px-8 py-2 rounded-md bg-gray-100 text-gray-700 font-medium">Compra não foi encontrada.</span>
            </div>
        )
    }

    return (
        <main className="flex-1">
            <BuyContent params={params} buy={res.buy}/>
        </main>
    )
}