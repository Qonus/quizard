import { getTranslations } from "next-intl/server";

export default async function LoadingPage() {
    const t = await getTranslations();
    return (
        <div className="w-full h-100 flex p-4">
            <div className="m-auto card rounded-4xl text-4xl font-bold">
                {t("loading")}
            </div>
        </div>
    )
}