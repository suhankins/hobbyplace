'use client';

import { SessionProvider } from 'next-auth/react';

export function CustomSessionProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchOnWindowFocus={false}>
            {children}
        </SessionProvider>
    );
}
