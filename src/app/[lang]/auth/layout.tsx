'use client';

import { GoBack } from '@/Components/GoBack';
import { LanguageSwitch } from '@/Components/LanguageSwitch/LanguageSwitch';
import { ThemeSwitch } from '@/Components/ThemeSwitch/ThemeSwitch';
import { Locale } from '@/i18n-config';

export default function AuthLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: {
        lang: Locale;
    };
}) {
    return (
        <>
            <div className="grid place-content-center h-screen w-full">
                {children}
            </div>
            <div className="absolute flex gap-4 top-8 right-8">
                <LanguageSwitch currentLocale={lang} />
                <ThemeSwitch />
            </div>
            <div className="absolute flex gap-4 top-8 left-8">
                <GoBack />
            </div>
        </>
    );
}
