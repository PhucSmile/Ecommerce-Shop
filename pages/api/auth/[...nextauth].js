import { authApi } from '@/api/authApi';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                try {
                    const { data } = await authApi.login(credentials);
                    if (data) {
                        // console.log('data: ', data);
                        return data;
                    } else {
                        return null;
                    }
                } catch (e) {
                    return null;
                }
            },
        }),
    ],

    // secret: process.env.JWT_SECRET,

    callbacks: {
        async jwt({ token, user, account }) {
            // console.log('account', account);
            console.log('token', token);
            console.log('user', user);
            try {
                if (user) {
                    token.accessToken = token.accessToken;
                    token.accessTokenExpiry = user.expiresIn;
                    token.user = user;
                }

                return token;
            } catch (error) {
                return token;
            }
        },
        async session({ session, token }) {
            // console.log("session", session);
            // console.log("token", token);

            session.accessToken = token.accessToken;
            session.user = token.user;
            // session.expires = new Date(token.accessTokenExpiry).toISOString();
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
});
