import { CollectionModel } from '@/Components/shared/Models';
import { UserClass } from '@/Components/User/User';
import { UserController } from '@/Components/User/UserController';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function validateSession({
    children,
    params
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/api/auth/signin'); // TODO: Change this when i move to my own login form

    const user = await UserController.getByEmail(session.user?.email as string);
    const model = await CollectionModel.findById(params.id).populate('owner');
    const owner = model?.owner as UserClass;
    if (user?.email !== owner.email) redirect('/api/auth/signin'); // TODO: Change this when i move to my own login form

    return <>{children}</>;
}
