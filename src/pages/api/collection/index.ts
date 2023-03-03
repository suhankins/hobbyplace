import { CollectionClass } from '@/Components/Collection/Collection';
import { handleDbError } from '@/lib/handleDbError';
import { CollectionModel } from '@/Components/shared/Models';
import { parseJson } from '@/lib/parseJson';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CollectionField } from '@/Components/Fields/modelFields/CollectionField';
import { getToken } from 'next-auth/jwt';
import { UserController } from '@/Components/User/UserController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CollectionClass | string | void>
) {
    const token = await getToken({ req });
    if (!token) {
        res.status(401).send();
        return;
    }

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
                const user = await UserController.getByEmail(
                    token.email as string
                );
                if (user === null) return;
                
                const result = await CollectionModel.create({
                    name: query.name as string,
                    description: query.description as string,
                    category: query.category as string,
                    fields: query.fields as CollectionField[],
                    owner: user._id,
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
