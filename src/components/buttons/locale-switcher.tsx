import { setUserLocale } from "@/lib/locale";
import { useLocale } from "next-intl";
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../ui/dropdown-menu";


export default function LocaleSwitcher() {
    const locale = useLocale();

    const items = [
        {
            value: 'en',
            label: 'English'
        },
        {
            value: 'ru',
            label: 'Русский'
        },
        {
            value: 'kz',
            label: 'Қазақша'
        }
    ]

    return (
        <DropdownMenuRadioGroup value={locale} onValueChange={setUserLocale}>
            {items.map((item, index) =>
                <DropdownMenuRadioItem key={index} value={item.value}>{item.label}</DropdownMenuRadioItem>
            )}
        </DropdownMenuRadioGroup>
    )
}