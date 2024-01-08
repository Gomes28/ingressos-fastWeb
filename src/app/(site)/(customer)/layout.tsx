import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const res = cookies().get('user');

    if(!res) {
        redirect(`/entrar`);
    }

    return (
        <>
            {children}
        </>
    )
}
