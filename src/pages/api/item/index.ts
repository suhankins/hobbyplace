import { NextApiRequest, NextApiResponse } from 'next';
import { ItemClass, ItemModel } from '../../../Components/Item/ItemModel';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ItemClass>
) {
    res.status(200).json(
        await ItemModel.create({
            name: 'Steve',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Fox_-_British_Wildlife_Centre_%2817429406401%29.jpg/1280px-Fox_-_British_Wildlife_Centre_%2817429406401%29.jpg',
            description: '# WOO',
            created: 0,
            updated: 0,
            tags: ['balls', 'farts'],
        } as ItemClass)
    );
}
