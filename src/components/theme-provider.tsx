'use client'

import { ThemeProvider as NextThemeProvider, ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return (
            <>
                {children}
            </>
        );
    }

    return (
        <NextThemeProvider {...props}>
            {children}
        </NextThemeProvider>
    )
}