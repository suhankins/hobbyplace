import { Burger } from '@/Components/shared/Icons';

export default function mainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="navbar bg-base-300 sticky top-0 z-40 shadow-lg">
                <div className="w-full max-w-screen-2xl mx-auto">
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
            </div>
            <div className="max-w-screen-2xl mx-auto">
                <div className="drawer drawer-mobile fixed lg:w-min z-30">
                    <input
                        id="left-side-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-side">
                        <label
                            htmlFor="left-side-drawer"
                            className="drawer-overlay"></label>
                        <ul className="menu p-4 w-72 lg:w-64 h-full bg-base-200 text-base-content">
                            <li>
                                <a>Login</a>
                            </li>
                            <li>
                                <a>Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="p-4 lg:ml-64">{children}</div>
            </div>
        </>
    );
}
