import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import db from "../../db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [Google],
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;
            return session;
        }
    }
});