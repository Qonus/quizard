import { ISet } from "@/components/types/tables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSets } from "./sets/actions";

export default async function Home() {
  const session = await auth();
  const t = await getTranslations("Home");

  const sets = await getSets();
  const userSets = await getSets(session?.user?.id);
  if (!sets) notFound();

  return (
    <div className="p-4 flex flex-col gap-5">
      <h1 className="title">{t("sets")}</h1>
      <Tabs defaultValue="public" className="w-full">
        <TabsList className="w-full h-13 bg-background">
          <TabsTrigger value="public"
            className="text-xl">
            {t("public")}
          </TabsTrigger>
          <TabsTrigger value="private"
            className={cn("text-xl", session ? "" : "hidden")}>
            {t("private")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="public" className="flex flex-col gap-5">
          {sets.map((set: ISet, index: number) => (
            <Link href={`/sets/${set.id}`} key={index} className="card p-4 hover:bg-card/50 transition cursor-pointer">
              <h1 className="text-lg font-bold">{set.title}</h1>
            </Link>
          ))}
        </TabsContent>
        {session ?
          <TabsContent value="private" className="flex flex-col gap-5">
            {userSets.map((set: ISet, index: number) => (
              <Link href={`/sets/${set.id}`} key={index} className="card p-4 hover:bg-card/50 transition cursor-pointer">
                <h1 className="text-lg font-bold">{set.title}</h1>
              </Link>
            ))}
          </TabsContent> :
          <></>
        }
      </Tabs>
    </div>
  );
}
