import { CollectionModel } from '@/Components/shared/Models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

export default async function itemPage({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/api/auth/signin'); // TODO: Change this when i move to my own login form

    return <>{children}</>;
}
