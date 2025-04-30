import LearnButton from "@/components/buttons/learn-button";
import { ICard } from "@/components/types/tables";
import { auth } from "@/lib/auth";
import { formatRelativeTime } from "@/lib/utils";
import { Edit, Trash } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { deleteSet, getSetByID } from "../actions";


export default async function SetPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const t = await getTranslations("SetPage");
    const locale = await getLocale();
    const { id } = await params;
    const session = await auth();
    const set = await getSetByID(id);
    if (!set || (!set.isPublic && (!session || !session.user || session.user.id != set.user.id))) notFound();

    const isAuthor = (session && session.user && session.user.id == set.user.id);

    const del = async () => {
        "use server";
        await deleteSet(id);
        redirect("/");
    }

    return (
        <div className="w-full flex p-5 flex-col gap-10 max-w-200 m-auto mb-30">
            <div className="w-full flex justify-between sm:items-center sm:flex-row flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <h1 className="title text-2xl">
                        {set.title}
                    </h1>
                    <p className="gray text-xl">
                        {set.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <p className="text-md rounded-full bg-card p-2 px-3 size-fit">{t(set.isPublic ? "public" : "private")}</p>
                        <p className="text-md rounded-full bg-card p-2 px-3 size-fit">{formatRelativeTime(new Date(set.createdAt), locale)}</p>
                    </div>
                </div>
                {isAuthor ?
                    <div className="flex gap-5">
                        <Link href={`/edit/${set.id}`} className="outline">
                            <Edit className="size-7" />
                        </Link>
                        <button
                            className="default"
                            onClick={del}
                        >
                            <Trash className="size-7" />
                        </button>
                    </div> :
                    <></>}
            </div>

            <div className="flex flex-wrap gap-5 items-center w-full">
                <div className="size-fit rounded-full overflow-hidden">
                    <Image
                        src={set.user.image}
                        width={40}
                        height={40}
                        alt="profile picture" />
                </div>
                <p className="font-bold">{set.user.name}</p>

            </div>

            <div className="flex flex-col">
                <LearnButton href={`/learn/${id}`} className={set.cards.length < 4 ? "bg-accent brightness-50 cursor-auto mb-3" : ""} />
                {set.cards.length < 4 ? <p className="gray">{t("min")}</p> : <></>}
            </div>

            <h1 className="title text-2xl">{t("cards")} ({set.cards.length})</h1>
            <div className="flex flex-col gap-6">
                {set.cards.map((card: ICard, index: number) => (
                    <div key={index} className="card p-4 px-10 hover:bg-card/50 transition cursor-pointer flex sm:flex-row flex-col gap-10 rounded-xl">
                        <h1 className="text-lg font-bold sm:w-1/2">{card.front}</h1>
                        <h1 className="text-lg font-bold sm:w-1/2">{card.back}</h1>
                    </div>
                ))}
            </div>
        </div >
    );
}