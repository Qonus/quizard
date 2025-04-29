import { getBaseUrl } from "@/lib/utils";
import axios from "axios";
import { notFound } from "next/navigation";

async function getSetByID(id: string) {
    const res = await axios.get(`${getBaseUrl()}/api/sets/${id}`);
    return res.data;
}

export default async function SetPage({
    params
}: {
    params: Promise<{ id: string }>
}
) {
    const { id } = await params;
    const set = await getSetByID(id);
    if (!set) notFound();

    return (
        <div className="w-full flex">
            <h1 className="m-auto title">
                {set.title}
            </h1>
        </div>
    );
}