"use client";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function NotFound() {
    const t = useTranslations("NotFound");
    return (
        <>
            <div className="w-full h-100 flex p-4">
                <motion.div
                    whileHover={{ rotate: 10, y: 20 }}
                    transition={{ type: "spring", }}
                    className="card rounded-4xl m-auto flex flex-col gap-5">
                    <h1 className="title">
                        {t("title")}
                    </h1>
                    <p className="gray">{t("description")}</p>
                </motion.div>
            </div>
        </>
    );
}