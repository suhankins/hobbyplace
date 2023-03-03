import { CollectionModel } from '@/Components/shared/Models';
import { notFound, redirect } from 'next/navigation';

export default async function itemPage({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    let model;
    try {
        model = await CollectionModel.findById(params.id).populate('owner');
    } catch (e) {
        notFound();
    }
    if (model === null) notFound();

    return <>{children}</>;
}
