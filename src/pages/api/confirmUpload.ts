import {
    CollectionModel,
    ItemModel,
    UserModel,
} from '@/components/MVC/Models';
import { UserController } from '@/components/MVC/User/UserController';
import { Storage } from '@google-cloud/storage';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<void>
) {
    const { method, query } = req;
    if (method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
        return;
    }

    const token = await getToken({ req });
    if (!token) {
        res.status(401).send();
        return;
    }

    const user = await UserController.getByEmail(token.email as string);

    if (
        typeof query.id !== 'string' ||
        query.id.length === 0 ||
        typeof query.type !== 'string' ||
        typeof query.filetype !== 'string' ||
        (query.filetype !== 'png' && query.filetype !== 'jpg')
    ) {
        res.status(400).send();
        return;
    }

    let id = query.id;
    let model;
    switch (query.type) {
        case 'item': {
            const item = await ItemModel.findById(id);
            if (item === null || item === undefined) {
                res.status(400).send();
                return;
            }
            model = item;
            id = item.belongsTo._id.toString();
        }
        case 'collection':
            {
                const collection = await CollectionModel.findById(id);
                if (collection === null || collection === undefined) {
                    res.status(400).send();
                    return;
                }
                const owner = await UserModel.findById(collection.owner._id);
                if (owner?.email !== token.email && user?.role !== 'admin') {
                    res.status(401).send();
                    return;
                }
                if (model === undefined) model = collection;
            }
            break;
        default:
            res.status(400).send();
            return;
    }

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const fileName = `${query.id}${query.filetype}`;

    const bucket = storage.bucket(process.env.BUCKET_NAME as string);
    const file = bucket.file(fileName);

    if (!(await file.exists())) {
        res.status(400).send();
        return;
    }

    model.image = file.publicUrl();
    model.save();

    res.status(200).send();
}
