import { CollectionClass } from '../Collection';
import { CollectionLong } from './CollectionLong';

export function CollectionList({
    collections,
}: {
    collections: CollectionClass[];
}) {
    return (
        <div className="flex gap-4 flex-col">
            {collections.map((collection, index) => {
                return (
                    <CollectionLong key={index} collection={collection} />
                );
            })}
        </div>
    );
}
