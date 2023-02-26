import { ThemeSetUp } from '@/Components/ThemeSwitch/ThemeSetUp';
import { CustomSessionProvider } from './SessionProvider';
import './globals.css';

export const metadata = {
    title: 'Hobbyplace',
    description: 'TODO: Description',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <ThemeSetUp />
            <body>
                <CustomSessionProvider>{children}</CustomSessionProvider>
            </body>
        </html>
    );
}
