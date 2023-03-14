'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from '../Icons/Icons';

export function GoBack() {
    const router = useRouter();
    return (
        <button className="btn" onClick={() => router.back()}>
            <ChevronLeft />
        </button>
    );
}
