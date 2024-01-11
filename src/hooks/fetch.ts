import { cookies } from "next/headers";

export const fetchData = async (path: string, ttl?: number) => {
    const token = cookies().get('token');
    const res = await fetch(process.env.NEXT_PUBLIC_URL_DEFAULT + path, {
        headers: {
            'authorization': token?.value ? `bearer ${token.value}` : null,
            'origin': 'http://hottickets.com.br/'
        },
        next: {
            revalidate: ttl ?? 60 * 60 * 4,
        }
    });

    const data = await res.json();

    return data;
}