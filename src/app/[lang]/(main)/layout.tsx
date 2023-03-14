import { LanguageSwitch } from '@/components/ViewOnly/LanguageSwitch/LanguageSwitch';
import { Searchbar } from '@/components/ViewOnly/Searchbar/Searchbar';
import { Burger } from '@/components/ViewOnly/Icons/Icons';
import { ThemeSwitch } from '@/components/ViewOnly/ThemeSwitch/ThemeSwitch';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import { DrawerMenu } from './DrawerMenu';

export default async function mainLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang as Locale);

    return (
        <>
            <div className="max-w-screen-2xl mx-auto">
                <div className="drawer drawer-mobile fixed z-30">
                    <input
                        id="left-side-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content">
                        <div className="navbar gap-4 px-4 bg-base-100 sticky top-0 z-40 shadow-lg">
                            <label
                                htmlFor="left-side-drawer"
                                className="btn drawer-button lg:hidden">
                                <Burger />
                            </label>
                            <div className="flex-1 lg:hidden">
                                <Link
                                    href="/"
                                    className="btn btn-ghost normal-case text-xl">
                                    Hobbyplace
                                </Link>
                            </div>
                            <Searchbar className="hidden lg:inline-flex lg:flex-1" />
                            <LanguageSwitch currentLocale={lang} />
                            <ThemeSwitch />
                        </div>
                        <div className="p-4">{children}</div>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="left-side-drawer"
                            className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 lg:w-64 h-full bg-base-200 text-base-content">
                            <li className="block lg:hidden">
                                <Searchbar />
                            </li>
                            <li className="hidden lg:block">
                                <Link
                                    href="/"
                                    className="btn btn-ghost normal-case text-xl">
                                    Hobbyplace
                                </Link>
                            </li>
                            <DrawerMenu dictionary={dictionary.drawer} />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
