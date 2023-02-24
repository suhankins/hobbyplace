'use client';

import { UpdateTheme } from './UpdateTheme';
import { useEffect } from 'react';

export function ThemeSetUp() {
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            if (!localStorage.theme) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches)
                    localStorage.theme = 'dark';
                else localStorage.theme = 'light';
            }
            UpdateTheme();
        }
    }, [])

    return <></>;
}
