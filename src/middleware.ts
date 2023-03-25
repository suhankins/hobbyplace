import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { localizationMiddleware } from './middleware/localizationMiddleware';

export default async function middleware(request: NextRequest) {
    let response = localizationMiddleware(
        request,
        NextResponse.next()
    );
    // If the localization middleware returns a redirect, we return it
    if (response.status === 307) return response;
    // TODO: Auth middleware
    return response;
};

export const config = {
    matcher: ['/((?!_next/static|NOIMAGE.png|_next/image|favicon.ico).*)'],
};
