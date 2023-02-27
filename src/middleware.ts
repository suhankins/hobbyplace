import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

function getLocale(request: NextRequest) {
    const prefered = request.cookies.get('language');
    if (prefered === undefined || prefered === null) {
        return i18n.defaultLocale;
    }
    return prefered.value;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
    }

    const chosenLocale = pathname.split("/")[1];
    
    const response = NextResponse.next();
    response.cookies.set("language", chosenLocale);

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|NOIMAGE.png|_next/image|favicon.ico).*)'],
};
