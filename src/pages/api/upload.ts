import { SignedPostPolicyV4Output, Storage } from '@google-cloud/storage';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SignedPostPolicyV4Output | string | void>
) {
    const token = await getToken({ req });

    if (!token) {
        res.status(401).send();
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
    const file = bucket.file(req.query.file as string);
    const options = {
        expires: Date.now() + 1 * 60 * 1000, // 1 minute,
        fields: { 'x-goog-meta-test': 'data' },
    };

    const [response] = await file.generateSignedPostPolicyV4(options);
    res.status(200).json(response);
}
