import { CollectionClass } from '@/Components/Collection/Collection';
import { CollectionController } from '@/Components/Collection/CollectionController';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CollectionClass | string | void>
) {
    const { method, query } = req;

    switch (method) {
        case 'GET':
            res.status(StatusCodes.OK).json(
                JSON.stringify(await CollectionController.getAll())
            );
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
