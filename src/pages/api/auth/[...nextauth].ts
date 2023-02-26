import { UserModel } from '@/Components/shared/Models';
import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '********',
                },
            },
            async authorize(credentials, req) {
                const username = credentials?.username;
                const password = credentials?.password;

                if (
                    typeof username !== 'string' ||
                    typeof password !== 'string'
                ) {
                    return null;
                }

                const user = await UserModel.findOne({ username: username });

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
};

export default NextAuth(authOptions);
