import { UserModel } from '@/components/MVC/Models';
import { UserClass } from '@/components/MVC/User/User';
import { handleDbError } from '@/lib/handleDbError';
import { parseJson } from '@/lib/parseJson';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';

type UserParams = {
    name: string;
    email: string;
    password: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserClass | string | void>
) {
    const { method } = req;

    switch (method) {
        case 'POST':
            let query: UserParams | string = parseJson(req.body);
            console.log(query);
            if (typeof query === 'string') {
                res.status(StatusCodes.BAD_REQUEST).send(query);
                return;
            }

            try {
                const result = await UserModel.create({
                    name: query.name,
                    email: query.email,
                    passwordHash: await hash(query.password, 10),
                });
                res.status(200).json(result);
            } catch (e) {
                handleDbError(e, res);
                return;
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
