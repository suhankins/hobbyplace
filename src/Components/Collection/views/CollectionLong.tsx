import { ItemClass } from '@/Components/Item/Item';
import { ItemSmall } from '@/Components/Item/views/ItemSmall';
import Link from 'next/link';
import { CollectionClass } from '../Collection';

export function CollectionLong({
    collection,
}: {
    collection: CollectionClass;
}) {
    return (
        <article className="w-full bg-base-300 rounded-xl shadow-xl overflow-hidden flex flex-row gap-4 items-center">
            <div className="card card-compact bg-neutral w-48 rounded-none">
                <div className="card-body">
                    <Link href={`/collection/${collection._id}`} className="card-title hover:underline">
                        {collection.name}
                    </Link>
                    <div>
                        Category:{' '}
                        <Link
                            href={`/category/${encodeURI(collection.category)}`}
                            className="text-accent focus:text-accent-focus hover:underline">
                            {collection.category}
                        </Link>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        {/* TODO: Add owner of the collection */}
                        <div className="avatar">
                            <div className="w-8 rounded-full">
                                <img src="/NOIMAGE.png" />
                            </div>
                        </div>
                        <Link
                            href="#" // TODO: link to owner
                            className="text-accent focus:text-accent-focus hover:underline">
                            someone
                        </Link>
                    </div>
                </div>
                <figure className="h-48">
                    <img
                        src={collection.image ?? '/NOIMAGE.png'}
                        alt={`${collection.name} preview image`}
                    />
                </figure>
            </div>
            <div className="flex flex-row gap-4 items-center py-4 overflow-y-auto">
                {collection.items?.map((item, index) => {
                    return <ItemSmall key={index} item={item as ItemClass} />;
                })}
            </div>
        </article>
    );
}
