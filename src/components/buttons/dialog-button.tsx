"use client";

import * as motion from "motion/react-client";
import { ResponsiveDialog, ResponsiveDialogProps } from "../responsive-dialog";

export default function DialogButton({ children, ...props }: ResponsiveDialogProps) {
    return (
        <ResponsiveDialog {...props}>
            <motion.button
                className="p-2 default rounded-full size-fit"
                whileHover={{
                    scale: 1.1
                }}
                whileTap={{
                    scale: 0.9
                }}
            >
                {children}
            </motion.button>
        </ResponsiveDialog>
    );
}