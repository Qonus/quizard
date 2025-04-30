"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function LearnButton({ href, className }: { href: string, className?: string }) {
    const t = useTranslations("SetPage");
    return (
        <motion.a
            href={href}
            whileTap={{ scale: 0.9 }}
            className={cn("default rounded-xl size-fit text-lg py-3 px-10", className)}
        >
            {t("learn")}
        </motion.a>
    )
}