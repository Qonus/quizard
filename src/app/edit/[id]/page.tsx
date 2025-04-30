import { getSetByID } from "@/app/sets/actions";
import EditSetForm from "@/components/forms/edit-set-form";
import { notFound } from "next/navigation";

export default async function CreatePage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const set = await getSetByID(id);
    if (!set) notFound();

    return (
        <EditSetForm defaultValues={set} />
    );
}