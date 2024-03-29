import { UserModel } from '@/components/MVC/Models';
import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                name: {
                    label: 'Name',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '********',
                },
            },
            async authorize(credentials, req) {
                const name = credentials?.name;
                const password = credentials?.password;

                if (typeof name !== 'string' || typeof password !== 'string') {
                    return null;
                }

                const user = await UserModel.findOne({ name: name });

                if (user !== null && user !== undefined) {
                    if (await compare(password, user.passwordHash)) {
                        return user;
                    }
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        //signIn: "/auth/login"
    },
};

export default NextAuth(authOptions);
