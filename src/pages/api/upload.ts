import {
    CollectionModel,
    ItemModel,
    UserModel,
} from '@/Components/shared/Models';
import { UserController } from '@/Components/User/UserController';
import {
    GenerateSignedPostPolicyV4Options,
    SignedPostPolicyV4Output,
    Storage,
} from '@google-cloud/storage';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SignedPostPolicyV4Output | string | void>
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
    switch (query.type) {
        case 'item': {
            const model = await ItemModel.findById(id);
            if (model === null || model === undefined) {
                res.status(400).send();
                return;
            }
            id = model.belongsTo._id.toString();
        }
        case 'collection':
            {
                const model = await CollectionModel.findById(id);
                if (model === null || model === undefined) {
                    res.status(400).send();
                    return;
                }
                const owner = await UserModel.findById(model.owner._id);
                if (owner?.email !== token.email && user?.role !== 'admin') {
                    res.status(401).send();
                    return;
                }
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

    const bucket = storage.bucket(process.env.BUCKET_NAME as string);
    const file = bucket.file(`${query.id}${query.filetype}`);
    const options: GenerateSignedPostPolicyV4Options = {
        expires: Date.now() + 1 * 60 * 1000, // 1 minute,
        fields: { 'x-goog-meta-test': 'data' },
    };

    const [response] = await file.generateSignedPostPolicyV4(options);
    res.status(200).json(response);
}
