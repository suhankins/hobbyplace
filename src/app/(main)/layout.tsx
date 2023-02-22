import { Burger } from '@/Components/shared/Icons';
import Link from 'next/link';

export default function mainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
                        <div className="navbar bg-base-300 sticky top-0 z-40 shadow-lg">
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
                        </div>
                        <div className="p-4">{children}</div>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="left-side-drawer"
                            className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 lg:w-64 h-full bg-base-200 text-base-content">
                            <li>
                                <Link
                                    href="/"
                                    className="btn btn-ghost normal-case text-xl">
                                    Hobbyplace
                                </Link>
                            </li>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
