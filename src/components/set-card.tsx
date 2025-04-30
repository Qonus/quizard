import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ISet } from "./types/tables";

export default async function SetCard({
    set,
}: {
    set: ISet
}) {
    const t = await getTranslations("Home");

    return (
        <Link href={`/sets/${set.id}`} className="card p-4 hover:bg-card/50 transition cursor-pointer flex gap-3">
            <div className="rounded-full overflow-hidden h-fit min-w-10">
                <Image
                    src={set.user.image || ""}
                    width={40}
                    height={40}
                    alt="profile picture" />

            </div>
            <div>
                <div className="block items-center mb-3">
                    <p className="inline-block font-bold mr-3 mb-3">{set.user.name}</p>
                    <p className="inline-block rounded-full bg-card border-foreground/40 border-1 p-0.5 px-3 size-fit">{t(set.isPublic ? "public" : "private")}</p>
                </div>
                <h1 className="text-xl font-bold mb-2">{set.title}</h1>
                <p>({set.cards as number}) {t("cards")}</p>
            </div>
        </Link >
    )
}