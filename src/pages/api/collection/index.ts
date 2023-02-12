import {
    CollectionClass,
    CollectionModel,
} from '@/Components/Collection/CollectionModel';
import { handleDbError } from '@/Components/shared/handleDbError';
import { parseJson } from '@/Components/shared/parseJson';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CollectionClass | string | void>
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(StatusCodes.OK).send(
                JSON.stringify(await CollectionModel.find())
            );
            break;
        case 'POST':
            // Create collection in DB
            let query: CollectionClass | string = parseJson(req.body);
            if (typeof query === 'string') {
                res.status(StatusCodes.BAD_REQUEST).send(query);
                return;
            }

            let result;
            try {
                result = await CollectionModel.create({
                    name: query.name as string,
                    description: query.description as string,
                    category: query.category as string,
                    fields: query.fields as string[],
                });
            } catch (e) {
                handleDbError(e, res);
            }
            res.status(200).json(result);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
