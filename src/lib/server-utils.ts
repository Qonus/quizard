"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";

export async function getIsMobile() {
    const { device } = userAgent({ headers: await headers() })
    const isMobile = device?.type === 'mobile'
    return isMobile;
}