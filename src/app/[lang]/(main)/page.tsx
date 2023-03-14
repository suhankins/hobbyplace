import { CollectionClass } from '@/components/MVC/Collection/Collection';
import { CollectionController } from '@/components/MVC/Collection/CollectionController';
import { CollectionList } from '@/components/MVC/Collection/views/CollectionList';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';

export default async function Home({
    params: { lang },
}: {
    params: { lang: string };
}) {
    const dictionary = await getDictionary(lang as Locale);

    const collections = await CollectionController.getAll({
        limit: 4,
        sortBy: 'items',
        includeItems: true,
        itemsLimit: 4,
    });

    return (
        <main>
            <CollectionList
                dictionary={dictionary.collection}
                collections={collections as CollectionClass[]}
            />
        </main>
    );
}
