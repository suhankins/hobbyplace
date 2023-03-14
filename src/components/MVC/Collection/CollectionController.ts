import { CollectionModel } from '../Models';

type getAllParameters = {
    limit?: number;
    includeItems?: boolean;
    itemsLimit?: number;
    sortBy?: 'date' | 'items';
    sortingOrder?: 'ascending' | 'descending';
};

const sorts = {
    date: (a: any, b: any) => a.updated - b.updated,
    items: (a: any, b: any) => a.itemCount - b.itemCount,
};

export const CollectionController = {
    async getAll(params = {} as getAllParameters) {
        const {
            limit,
            includeItems = false,
            itemsLimit,
            sortBy = 'date',
            sortingOrder = 'descending',
        } = params;
        const query = CollectionModel.find();
        if (includeItems)
            query.populate({ path: 'items', perDocumentLimit: itemsLimit });
        if (limit) query.limit(limit);
        query.populate({ path: 'owner' });

        const result = await query;
        result.sort(sorts[sortBy]);
        if (sortingOrder === 'descending') {
            result.reverse();
        }
        return result;
    },
};
