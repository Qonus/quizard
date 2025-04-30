"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="outline size-fit"
        >
            <ArrowLeft className="size-7" />
        </motion.button>
    )
}