import { ItemField } from '@/Components/Fields/modelFields/ItemField';
import { handleDbError } from '@/lib/handleDbError';
import { ItemModel } from '@/Components/shared/Models';
import { parseJson } from '@/lib/parseJson';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ItemClass } from '@/Components/Item/Item';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ItemClass | string | void>
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(StatusCodes.OK).send(
                JSON.stringify(await ItemModel.find())
            );
            break;
        case 'POST':
            // Create item in DB
            let query: ItemClass | string = parseJson(req.body);
            if (typeof query === 'string') {
                res.status(StatusCodes.BAD_REQUEST).send(query);
                return;
            }

            // Field validation is too complex to be done automatically, so it's done here
            if (
                !(await ItemClass.ValidateFields(query.belongsTo, query.fields))
            ) {
                res.status(StatusCodes.BAD_REQUEST).send();
                return;
            }

            try {
                const result = await ItemModel.create({
                    name: query.name as string,
                    image: query.image as string,
                    tags: query.tags as string[],
                    fields: query.fields as ItemField[],
                    belongsTo: query.belongsTo,
                });
                res.status(200).json(result);
            } catch (e) {
                handleDbError(e, res);
                return;
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
