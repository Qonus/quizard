import EditSetForm from "@/components/forms/edit-set-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreatePage() {
    const session = await auth();
    if (!session) redirect("/");
    return (
        <EditSetForm />
    );
}