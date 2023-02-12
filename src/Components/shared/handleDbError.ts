import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';

/**
 * Handles errors when creating new documents in DB. Sends either error message or error object.
 * @param e error
 * @param res response object
 */
export function handleDbError(
    e: any,
    res: NextApiResponse<string | void>
): void {
    if (typeof e === 'string') {
        console.error(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    } else if (e instanceof Error && 'errors' in e) {
        let errorResponse: { [id: string]: string } = {};
        const errors = e.errors as {
            [id: string]: { properties: { message: string } };
        };
        for (const path in errors) {
            errorResponse[path] = errors[path].properties.message;
        }
        res.status(StatusCodes.BAD_REQUEST).send(JSON.stringify(errorResponse));
    } else {
        console.error(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
