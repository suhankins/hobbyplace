'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export function DrawerMenu({
    dictionary,
}: {
    dictionary: {
        log_in: string;
        log_out: string;
        register: string;
    };
}) {
    const { data: session } = useSession();

    if (session === null || session === undefined) {
        return (
            <>
                <li>
                    <button onClick={() => signIn()}>
                        {dictionary.log_in}
                    </button>
                </li>
                <li>
                    <Link href={`/auth/register`}>{dictionary.register}</Link>
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
                    <button onClick={() => signOut()}>
                        {dictionary.log_out}
                    </button>
                </li>
            </>
        );
    }
}
