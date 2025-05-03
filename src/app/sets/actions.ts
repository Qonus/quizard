"use server";

import { getBaseUrl } from "@/lib/server-utils";
import axios from "axios";

export async function getSetByID(id: string) {
    try {
        const res = await axios.get(`${await getBaseUrl()}/api/sets/${id}`);
        return res.data;
    } catch {
        return null;
    }
}

export async function deleteSet(id: string) {
    const res = await axios.delete(`${await getBaseUrl()}/api/sets/${id}`);
    return res.data;
}

export async function getSets(userId?: string) {
    try {
        const sets = await axios.get(`${await getBaseUrl()}/api/sets?${userId && `userid=${userId}`}`);
        return sets.data;
    } catch {
        return null;
    }
}