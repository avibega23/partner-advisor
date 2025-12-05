import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { pages } from "next/dist/build/templates/app-page";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_SECRET_KEY = process.env.GOOGLE_CLIENT_SECRET!;

export const authOption: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_SECRET_KEY,
        }),
    ],

    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signIn",
    },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
