"use client";

import { submitLogout } from "@/lib/server-utils";
import { LogOut } from "lucide-react";
import { motion } from "motion/react";

export default function LogoutButton() {
    return (
        <form
            action={submitLogout}
        >
            <motion.button
                whileTap={{ scale: 0.9 }}
                className="ghost rounded-full p-2">
                <LogOut className="size-7" />
            </motion.button>
        </form >
    )
}