import { CollectionClass } from '@/Components/Collection/Collection';
import { handleDbError } from '@/Components/shared/handleDbError';
import { CollectionModel } from '@/Components/shared/Models';
import { parseJson } from '@/Components/shared/parseJson';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CollectionClass | string | void>
) {
    const { method } = req;

    switch (method) {
        case 'POST':
            // Create collection in DB
            let query: CollectionClass | string = parseJson(req.body);
            if (typeof query === 'string') {
                res.status(StatusCodes.BAD_REQUEST).send(query);
                return;
            }

            try {
                const result = await CollectionModel.create({
                    name: query.name as string,
                    description: query.description as string,
                    category: query.category as string,
                    fields: query.fields as string[],
                });
                res.status(200).json(result);
            } catch (e) {
                handleDbError(e, res);
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
