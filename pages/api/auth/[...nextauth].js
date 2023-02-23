import { authApi } from '@/apiClient/authApi';
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

    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        token: process.env.NEXT_PUBLIC_SECRET,
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 24 * 30,
    },

    callbacks: {
        async jwt({ token, user, account }) {
            // console.log('account', account);
            // console.log('token', token);
            // console.log('user', user);
            try {
                if (account) {
                    token.accessToken = token.access_token;
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
    // pages: {
    //     signIn: '/auth/signin',
    // },
});
