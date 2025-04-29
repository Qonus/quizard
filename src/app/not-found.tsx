"use client";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function NotFound() {
    const t = useTranslations("NotFound");
    return (
        <>
            <div className="w-full h-screen flex">
                <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", }}
                    className="card m-auto flex flex-col gap-5">
                    <h1 className="title">
                        {t("title")}
                    </h1>
                    <p className="gray">{t("description")}</p>
                </motion.div>
            </div>
        </>
    );
}