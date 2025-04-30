"use client";
import { submitSignIn } from "@/lib/server-utils";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";


export default function SignInForm() {

    const t = useTranslations("SignInForm");
    return (
        <form action={submitSignIn} className="size-full p-5">
            <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="py-2 px-4 rounded-full default font-bold">
                {t("with", { service: "Google" })}
            </motion.button>
        </form>
    );
}