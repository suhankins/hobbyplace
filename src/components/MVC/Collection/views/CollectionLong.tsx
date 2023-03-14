import { ItemClass } from '@/components/MVC/Item/Item';
import { ItemSmall } from '@/components/MVC/Item/views/ItemSmall';
import { UserClass } from '@/components/MVC/User/User';
import Link from 'next/link';
import { CollectionClass } from '../Collection';

export function CollectionLong({
    collection,
    dictionary
}: {
    collection: CollectionClass;
    dictionary: {
        category: string;
        author: string;
    };
}) {
    const owner = collection.owner as UserClass;
    return (
        <article className="w-full bg-base-300 rounded-xl shadow-xl overflow-hidden flex flex-col sm:flex-row sm:gap-4 items-center">
            <div className="card card-compact bg-base-200 w-full sm:w-48 rounded-none">
                <div className="card-body">
                    <Link
                        href={`/collection/${collection._id}`}
                        className="card-title hover:underline">
                        {collection.name}
                    </Link>
                    <div>
                        {dictionary.category}:{' '}
                        <Link
                            href={`/category/${encodeURIComponent(
                                collection.category
                            )}`}
                            className="text-accent focus:text-accent-focus hover:underline">
                            {collection.category}
                        </Link>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <Link
                            href={`/user/${owner.name}`}
                            className="text-accent focus:text-accent-focus hover:underline">
                            {owner.name}
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
            <div className="divider sm:hidden" />
            <div className="flex flex-col sm:flex-row gap-4 items-center py-4">
                {collection.items?.map((item, index) => {
                    return <ItemSmall key={index} item={item as ItemClass} />;
                })}
            </div>
        </article>
    );
}
