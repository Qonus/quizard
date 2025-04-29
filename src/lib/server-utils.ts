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