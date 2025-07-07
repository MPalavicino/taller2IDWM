"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/helpers/decodeJWT";
import { useAuth } from "@/hooks/useAuth";




export default function ClientLayout({children}: {children: React.ReactNode}) {
    const {user, status} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.token){
            router.push('/login');
            return;
        }

        const payload = decodeJWT (user.token);
        if (!payload || payload.role !== 'User') {
            router.replace('/');
            return;
        }

    }, [user, status, router]);

    if (status === 'loading' || !user) return <div>Cargando...</div>;

    return (
        <html lang ="en">
            <main>
                {children}
            </main>                
        </html>
    )
}

