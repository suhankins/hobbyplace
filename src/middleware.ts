import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { localizationMiddleware } from './middleware/localizationMiddleware';
import { authMiddleware } from './middleware/authMiddleware';
import { StatusCodes } from 'http-status-codes';

export default async function middleware(request: NextRequest) {
    let response = localizationMiddleware(request, NextResponse.next());
    // If the localization middleware returns a redirect, we return it
    if (response.status === StatusCodes.TEMPORARY_REDIRECT) return response;

    response = await authMiddleware(request, response);
    return response;
}

export const config = {
    matcher: ['/((?!_next/static|NOIMAGE.png|_next/image|favicon.ico).*)'],
};
