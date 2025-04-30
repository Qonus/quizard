"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";

export default function CreateSetButton() {
    return (
        <motion.a
            href="/create"
            className="p-2 default rounded-full size-fit"
            whileHover={{
                scale: 1.1
            }}
            whileTap={{
                scale: 0.9,
                rotate: -5
            }}
        >
            <Plus className="size-7 w-fit z-10" />
        </motion.a>
    );
}