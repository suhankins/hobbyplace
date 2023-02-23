import Link from 'next/link';
import { ItemClass } from '../Item';

export function ItemSmall({ item }: { item: ItemClass }) {
    return (
        <div className="card w-full sm:w-48 bg-neutral">
            <div className="card-body">
                <Link href={`/item/${item._id}`} className="card-title hover:underline">
                    {item.name}
                </Link>
                <div className="flex flex-row gap-1 items-center">
                    <div className="badge badge-outline">TODO: Add tags</div>
                </div>
            </div>
            <figure className="h-40">
                <img
                    src={item.image ?? './NOIMAGE.png'}
                    alt={`${item.name} preview image`}
                />
            </figure>
        </div>
    );
}
