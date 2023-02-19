import { Burger } from '@/Components/shared/Icons';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <div className="navbar bg-base-300">
                    <div>
                        <div className="drawer-content flex flex-col items-center justify-center">
                            <label
                                htmlFor="left-side-drawer"
                                className="btn drawer-button lg:hidden">
                                <Burger />
                            </label>
                        </div>
                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">
                            Hobbyplace
                        </a>
                    </div>
                </div>
                <div className="drawer drawer-mobile">
                    <input
                        id="left-side-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content flex flex-col">
                        {children}
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="left-side-drawer"
                            className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 bg-base-200 text-base-content">
                            <li>
                                <a>Login</a>
                            </li>
                            <li>
                                <a>Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </body>
        </html>
    );
}
