"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const t = useTranslations();

    return (
        <DropdownMenuItem
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme == "light" ? <Sun /> : <Moon />}
            {t("theme")}
        </DropdownMenuItem>
    )
}