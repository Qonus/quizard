import { getSets } from "@/app/sets/actions";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import SetCard from "../set-card";
import { ISet } from "../types/tables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default async function SetsPage() {
    const session = await auth();
    const t = await getTranslations("Home");

    const sets = await getSets();
    const userSets = await getSets(session?.user?.id);
    if (!sets) notFound();

    return (
        <div className="p-4 flex flex-col gap-5 max-w-200 m-auto">
            <h1 className="title">{t("sets")}</h1>
            <Tabs defaultValue="public" className="w-full">
                <TabsList className="w-full h-13 bg-background shadow-xl">
                    <TabsTrigger value="public"
                        className="text-xl">
                        {t("public")}
                    </TabsTrigger>
                    <TabsTrigger value="your"
                        className={cn("text-xl", session ? "" : "hidden")}>
                        {t("your")}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="public" className="flex flex-col gap-5 py-10">
                    {sets.map((set: ISet, index: number) => (
                        <SetCard key={index} set={set} />
                    ))}
                </TabsContent>
                {session ?
                    <TabsContent value="your" className="flex flex-col gap-5 py-10">
                        {userSets.map((set: ISet, index: number) => (
                            <SetCard key={index} set={set} />
                        ))}
                    </TabsContent> :
                    <></>
                }
            </Tabs>
        </div>
    );
}