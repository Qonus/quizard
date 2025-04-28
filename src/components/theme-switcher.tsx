'use client'

import { motion, useAnimation } from "motion/react";
import { useTheme } from 'next-themes';
import { Icons } from './icons/icons';

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();
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
            className='button ghost rounded-full size-fit'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {/* {theme === 'light' ? <Sun /> : <Moon />} */}
            <Icons.logo />
            <motion.div
                key="modal"
                initial={{ width: 0 }}
                animate={controls}
                className='overflow-hidden'
                transition={{ duration: 0.2, type: "spring" }}
            >
                <h1 className='text-2xl font-bold text-primary'>Quizard</h1>
            </motion.div>
        </motion.button>
    )
}