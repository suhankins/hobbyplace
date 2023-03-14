import { CollectionClass } from '../Collection';
import { CollectionLong } from './CollectionLong';

export function CollectionList({
    collections,
    dictionary
}: {
    collections: CollectionClass[];
    dictionary: {
        category: string;
        author: string;
    };
}) {
    return (
        <div className="flex gap-8 sm:gap-4 flex-col">
            {collections.map((collection, index) => {
                return <CollectionLong key={index} dictionary={dictionary} collection={collection} />;
            })}
        </div>
    );
}
