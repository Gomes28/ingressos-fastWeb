import { cookies } from "next/headers";

export const fetchData = async (path: string, ttl?: number) => {
    try {
        const token = cookies().get('access_token');
        const res = await fetch(process.env.NEXT_PUBLIC_URL_DEFAULT + path, {
            headers: {
                'authorization': token?.value ? `Bearer ${token.value.replaceAll('"', '')}` : null,
                'origin': 'http://hottickets.com.br/'
            },
            next: {
                revalidate: ttl ?? 60 * 60 * 4,
            }
        });

        const data = await res.json();

        return data;
    } catch (error) {
        return null;
    }
}