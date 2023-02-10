import {
    CollectionClass,
    CollectionModel,
} from '@/Components/Collection/CollectionModel';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function userHandler(
    req: NextApiRequest,
    res: NextApiResponse<CollectionClass | string | void>
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(StatusCodes.OK).send(JSON.stringify(await CollectionModel.find()));
            break;
        case 'POST':
            // Create collection in DB
            let query: CollectionClass;
            try {
                query = JSON.parse(req.body);
            } catch (e) {
                let message = 'Unknown error';
                if (typeof e === 'string') {
                    message = e;
                } else if (e instanceof Error) {
                    message = e.message;
                }
                console.error(message);
                res.status(StatusCodes.BAD_REQUEST).send(message);
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
                if (typeof e === 'string') {
                    console.error(e);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
                    return;
                } else if (e instanceof Error) {
                    if ('errors' in e) {
                        let errorResponse: { [id: string]: string } = {};
                        const errors = e.errors as {
                            [id: string]: { properties: { message: string } };
                        };
                        for (const path in errors) {
                            errorResponse[path] =
                                errors[path].properties.message;
                        }
                        console.error(JSON.stringify(errorResponse));
                        res.status(StatusCodes.BAD_REQUEST).send(
                            JSON.stringify(errorResponse)
                        );
                    } else {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
                    }
                    return;
                }
            }
            res.status(200).json(result);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
