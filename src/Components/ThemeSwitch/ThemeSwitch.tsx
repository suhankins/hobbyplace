'use client';

import { useEffect, useState } from 'react';
import { Dark, Light } from '../shared/Icons';
import { UpdateTheme } from './UpdateTheme';

export function ThemeSwitch() {
    const [theme, setTheme] = useState('light');

    if (typeof window !== 'undefined') {
        useEffect(() => {
            setTheme(localStorage.theme);
        }, []);
    }

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
