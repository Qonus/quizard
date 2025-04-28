import CreateButton from "./create-button";
import { ThemeSwitcher } from "./theme-switcher";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full">
            <div className="container p-5 flex justify-between gap-3">
                <ThemeSwitcher />
                <CreateButton />
            </div>
        </div>
    )
}