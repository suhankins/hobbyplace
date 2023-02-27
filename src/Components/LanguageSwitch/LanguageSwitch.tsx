'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n, Locale } from '../../i18n-config';

export function LanguageSwitch({ currentLocale }: { currentLocale: Locale }) {
    const pathname = usePathname();
    const otherLocales = i18n.locales.filter(
        (locale) => locale !== currentLocale
    );

    function currentPathWithNewLocale(locale: Locale) {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    }

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
                {currentLocale}
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box">
                {otherLocales.map((locale) => (
                    <li key={locale}>
                        <Link
                            href={currentPathWithNewLocale(locale)}
                            className="uppercase">
                            {locale}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
