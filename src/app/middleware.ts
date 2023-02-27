import { NextRequest, NextResponse } from 'next/server';

let locales = ['en-US', 'nl-NL', 'nl'];

function getLocale(request: NextRequest) {
    const prefered = request.headers.get('language');
    if (prefered === undefined || prefered === null) {
        return 'en-US';
    }
    return prefered;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: ['/((?!_next).*)'],
};
