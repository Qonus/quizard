"use client";

import { Plus } from "lucide-react";
import * as motion from "motion/react-client";
import CreateForm from "./forms/create-form";
import { ResponsiveDialog } from "./responsive-dialog";

export default function CreateButton() {
    return (
        <ResponsiveDialog content={<CreateForm />}>
            <motion.button
                className="p-2 default rounded-full size-fit"
                whileHover={{
                    scale: 1.1
                }}
                whileTap={{
                    scale: 0.9,
                    rotate: -5
                }}
            >
                <Plus className="size-7 w-fit" />
            </motion.button>
        </ResponsiveDialog>
    );
}