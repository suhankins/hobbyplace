import { ItemModel } from "@/components/MVC/Models";
import { notFound } from 'next/navigation';

export default async function itemPage({ params }: { params: { id: string } }) {
    let model;
    try {
        model = await ItemModel.findById(params.id);
    } catch(e) {
        notFound();
    }
    if (model === null) notFound();

    return <div>{params.id}</div>;
}
