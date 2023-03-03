import { CollectionModel, UserModel } from '@/Components/shared/Models';
import Link from 'next/link';
import { Form } from './Form';

export default async function NewItem({ params }: { params: { id: string } }) {
    // We passed the layout check, so there's no way we can't find this item
    const model = await CollectionModel.findById(params.id);
    const owner = await UserModel.findById(model?.owner);

    if (model === null || owner === null) return;

    return (
        <div className="flex flex-col gap-4">
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <Link href={`/user/${owner.name}`}>{owner.name}</Link>
                    </li>
                    <li>
                        <Link href={`/collection/${model!._id}`}>
                            {model!.name}
                        </Link>
                    </li>
                    <li>New Item</li>
                </ul>
            </div>
            <h1 className="text-4xl font-bold">Create a new item</h1>
            <Form
                collectionId={model._id.toString()}
                fields={model.fields.map((value) => {
                    return {
                        name: value.name,
                        type: value.type,
                        _id: value.id,
                    };
                })}
            />
        </div>
    );
}
