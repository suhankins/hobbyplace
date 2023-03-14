'use client';

import { UpdateTheme } from './UpdateTheme';
import { useEffect } from 'react';

export function ThemeSetUp() {
    useEffect(() => {
        // Check if the code is being run in a browser
        if (typeof window !== 'undefined') {
            // Check if the user's preferred theme is not set
            if (localStorage.theme === undefined) {
                // If the user's preferred theme is not set, check if their preferred color scheme is dark
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    // If the user's preferred color scheme is dark, set the theme to dark
                    localStorage.theme = 'dark';
                } else {
                    // If the user's preferred color scheme is not dark, set the theme to light
                    localStorage.theme = 'light';
                }
            }

            // Update the theme based on the user's preferences
            UpdateTheme();
        }
    }, []);

    return <></>;
}
