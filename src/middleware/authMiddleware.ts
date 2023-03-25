import { CollectionClass } from '@/components/MVC/Collection/Collection';
import { CollectionModel } from '@/components/MVC/Models';
import { UserClass } from '@/components/MVC/User/User';
import { StatusCodes } from 'http-status-codes';
import { getToken, JWT } from 'next-auth/jwt';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';

type Session = { jwt: JWT | null | undefined };

/**
 * Sets the session.jwt to the token if it is not already set
 */
async function getSession(session: Session, request: NextRequest) {
    // If the session is already set, we don't need to do anything
    if (session.jwt || session.jwt === null) return;
    session.jwt = await getToken({ req: request });
}

const loginRedirect = (url: NextURL) => {
    url.pathname = '/api/auth/signin';
    return NextResponse.redirect(url);
};

const displayError = (url: NextURL, code: number) => {
    url.pathname = `/error/${code}`;
    // TODO: Change to rewrite
    return NextResponse.redirect(url);
};

/**
 * Checks if the user owns the collection
 */
async function ownsCollection(
    jwt: JWT,
    collectionId: string,
) {
    const result = await fetch(
        `${process.env.NEXTAUTH_URL}/api/collection?${new URLSearchParams({
            id: collectionId,
        })}`
    );
    if (result.status !== StatusCodes.OK) return false;
    const collection = (await result.json()) as CollectionClass;
    const owner = collection.owner as UserClass;
    return owner.email === jwt.email;
}

export async function authMiddleware(
    request: NextRequest,
    response: NextResponse
) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname.split('/');
    pathname.shift(); // remove the first empty string
    // api paths should do their own auth
    if (pathname[0] === 'api') return response;
    // paths with just 1 part don't need auth
    if (pathname.length === 1) return response;

    const pathnameEnd = pathname[pathname.length - 1];
    const session: Session = { jwt: undefined };

    if (pathnameEnd === 'new') {
        await getSession(session, request);
        if (!session.jwt) {
            return loginRedirect(url);
        }
        if (
            pathname[pathname.length - 2] !== 'collection' &&
            !(await ownsCollection(
                session.jwt,
                pathname[pathname.length - 2]
            ))
        ) {
            return displayError(url, StatusCodes.UNAUTHORIZED);
        }
    }
    return response;
}
