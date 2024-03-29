'use client';

import { useEffect, useState } from 'react';
import { Dark, Light } from '@/components/ViewOnly/Icons/Icons';
import { UpdateTheme } from './UpdateTheme';

export function ThemeSwitch() {
    const [theme, setTheme] = useState(
        (typeof localStorage !== 'undefined' && localStorage.theme) as
            | 'light'
            | 'dark'
    );

    useEffect(() => {
        localStorage.theme = theme;
        UpdateTheme();
    }, [theme]);

    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={(event) => {
                    if (event.target.checked) setTheme('dark');
                    else setTheme('light');
                }}
            />
            <Light className="swap-on" />
            <Dark className="swap-off" />
        </label>
    );
}
