import { CollectionModel } from '@/Components/shared/Models';
import { UserClass } from '@/Components/User/User';
import Link from 'next/link';
import { Form } from './Form';

export default async function NewItem({ params }: { params: { id: string } }) {
    // We passed the layout check, so there's no way we can't find this item
    const model = await CollectionModel.findById(params.id).populate('owner');
    const owner = model!.owner as UserClass;

    return (
        <div className="flex flex-col gap-4">
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <Link href={`/user/${owner.name}`}>{owner.name}</Link>
                    </li>
                    <li>
                        <Link href={`/collection/${model!._id}`}>{model!.name}</Link>
                    </li>
                    <li>New Item</li>
                </ul>
            </div>
            <h1 className="text-4xl font-bold">Create a new item</h1>
            <Form />
        </div>
    );
}
