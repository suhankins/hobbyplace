import { Burger } from '@/Components/Icons';
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
                <div className="navbar bg-base-100">
                    <div className="flex-none lg:hidden">
                        <button className="btn btn-square btn-ghost">
                            <Burger />
                        </button>
                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">
                            Hobbyplace
                        </a>
                    </div>
                </div>
                {children}
            </body>
        </html>
    );
}
