"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";
import { signIn, signOut } from "./auth";

export async function getIsMobile() {
    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === 'mobile';
    return isMobile;
}

export async function submitSignIn() {
    await signIn("google");
}

export async function submitLogout() {
    await signOut();
}

export async function getBaseUrl() {
    // const baseUrl =
    //     process.env.NEXT_PUBLIC_URL ||
    //     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    // console.log(baseUrl);
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    return baseUrl;
}