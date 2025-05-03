import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Github from "./icons/github";

export default async function Footer() {
    const t = await getTranslations("Footer");
    return (
        <div className="w-full h-30 flex justify-center items-center gap-2 text-lg p-7 sm:flex-row flex-col">
            <span>
                {t("follow")}
            </span>
            <Link href="https://github.com/Qonus/quizard" target="_blank" className="font-semibold border-foreground border-1 rounded-full p-2 flex gap-2 cursor-pointer">
                <Github className="fill-foreground" />
                GitHub
            </Link>
        </div>
    );
}