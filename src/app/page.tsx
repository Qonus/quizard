import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const session = await auth();
  const t = await getTranslations("Home");
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
            className="text-xl">
            {t("private")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="public">

        </TabsContent>
        <TabsContent value="private">

        </TabsContent>
      </Tabs>
    </div>
  );
}
