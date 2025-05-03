'use client'

import { motion, useAnimation } from "motion/react";
import { useRouter } from "next/navigation";
import Quizard from "../icons/quizard";

export function Logo() {
    const router = useRouter();
    const controls = useAnimation()

    const handleHoverStart = () => {
        controls.start({ width: 'auto' })
    }

    const handleHoverEnd = () => {
        controls.start({ width: 0 })
    }

    return (
        <motion.button
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            whileTap={{ scale: 0.95, transition: { duration: 0 } }}
            className='p-2 ghost rounded-full size-fit flex items-center gap-2'
            onClick={() => router.push("/")}
        >
            {/* {theme === 'light' ? <Sun /> : <Moon />} */}
            <Quizard />
            <motion.div
                key="modal"
                initial={{ width: 0 }}
                animate={controls}
                className='overflow-hidden'
                transition={{ type: "spring", duration: 0.3 }}
            >
                <h1 className='text-2xl font-bold text-primary'>Quizard</h1>
            </motion.div>
        </motion.button>
    )
}