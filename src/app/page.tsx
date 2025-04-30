import SetsPage from "@/components/pages/sets-page";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");
  return (
    <div className="w-full">
      <div className="flex mb-10 p-4">
        <div className="card m-auto max-w-150 flex-col gap-5">

          <h1 className="title m-auto text-2xl">{t("title")}</h1>
          <p className="gray m-auto text-xl">{t("description")}</p>
        </div>
      </div>

      <SetsPage />
    </div>
  )
}
