import { ThemeSwitch } from '@/Components/ThemeSwitch/ThemeSwitch';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="grid place-content-center h-screen w-full">
                {children}
            </div>
            <div className="absolute top-8 right-8">
                <ThemeSwitch />
            </div>
        </>
    );
}
