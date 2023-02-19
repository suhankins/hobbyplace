import { ItemClass } from '../Item';

export function ItemSmall({ item }: { item: ItemClass }) {
    return (
        <a href="#" className="card w-48 bg-neutral">
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <div className="flex flex-row gap-1 items-center">
                    <div className="badge badge-outline">TODO: Add tags</div>
                </div>
            </div>
            <figure className="h-48">
                <img
                    src={item.image ?? './NOIMAGE.png'}
                    alt={`${item.name} preview image`}
                />
            </figure>
        </a>
    );
}