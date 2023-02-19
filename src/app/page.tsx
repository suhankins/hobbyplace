import { CollectionClass } from '@/Components/Collection/Collection';
import { CollectionController } from '@/Components/Collection/CollectionController';
import { CollectionList } from '@/Components/Collection/views/CollectionList';

export default async function Home() {
    const collections = await CollectionController.getAll({
        limit: 4,
        sortBy: 'items',
        includeItems: true,
        itemsLimit: 4
    })
    return (
        <main>
            <CollectionList collections={collections as CollectionClass[]} />
        </main>
    );
}
