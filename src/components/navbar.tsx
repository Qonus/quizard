import { ThemeSwitcher } from "./theme-switcher";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full">
            <div className="container p-5 flex gap-3">
                <ThemeSwitcher />
            </div>
        </div>
    )
}