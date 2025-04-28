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
            whileTap={{ scale: 0.95, transition: { duration: 0 } }}
            className='p-2 ghost rounded-full size-fit flex items-center gap-2'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {/* {theme === 'light' ? <Sun /> : <Moon />} */}
            <Icons.logo />
            <motion.div
                key="modal"
                initial={{ width: 0 }}
                animate={controls}
                className='overflow-hidden'
            >
                <h1 className='text-2xl font-bold text-primary'>Quizard</h1>
            </motion.div>
        </motion.button>
    )
}