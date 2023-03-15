import { CollectionModel, UserModel } from '@/components/MVC/Models';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import { Form } from './Form';

export default async function NewItem({
    params: { id, lang },
}: {
    params: { id: string; lang: Locale };
}) {
    // We passed the layout check, so there's no way we can't find this item
    const model = await CollectionModel.findById(id);
    const owner = await UserModel.findById(model?.owner);

    if (model === null || owner === null) return;

    const dictionary = await getDictionary(lang);

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
                    <li>{dictionary.item_form.new_item}</li>
                </ul>
            </div>
            <h1 className="text-4xl font-bold">
                {dictionary.item_form.create_item}
            </h1>
            <Form
                collectionId={model._id.toString()}
                fields={model.fields.map((value) => {
                    return {
                        name: value.name,
                        type: value.type,
                        _id: value.id,
                    };
                })}
                dictionary={dictionary.item_form}
                imageUploaderDictionary={dictionary.image_uploader}
            />
        </div>
    );
}
