"use server";

import { getBaseUrl } from "@/lib/server-utils";
import axios from "axios";
import { cookies } from "next/headers";

export async function getSetByID(id: string) {
    try {
        const res = await axios.get(`${await getBaseUrl()}/api/sets/${id}`, {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });
        return res.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteSet(id: string) {
    const res = await axios.delete(`${await getBaseUrl()}/api/sets/${id}`, {
        headers: {
            Cookie: (await cookies()).toString()
        }
    });
    return res.data;
}

export async function getSets(userId?: string) {
    try {
        const sets = await axios.get(`${await getBaseUrl()}/api/sets?${userId && `userid=${userId}`}`, {
            headers: {
                Cookie: (await cookies()).toString()
            }
        });
        return sets.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}