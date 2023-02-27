'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export function DrawerMenu() {
    const { data: session } = useSession();

    if (session === null || session === undefined) {
        return (
            <>
                <li>
                    <button onClick={() => signIn()}>Log in</button>
                </li>
                <li>
                    <Link href={`/auth/register`}>Register</Link>
                </li>
            </>
        );
    } else {
        return (
            <>
                <li>
                    <Link href={`/user/${session.user?.name}`}>
                        {session.user?.name}
                    </Link>
                </li>
                <li>
                    <button onClick={() => signOut()}>Log out</button>
                </li>
            </>
        );
    }
}