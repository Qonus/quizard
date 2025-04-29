import { auth } from "@/lib/auth";
import CreateButton from "./buttons/create-button";
import LogoutButton from "./buttons/logout-button";
import SignInButton from "./buttons/sign-in-button";
import { ThemeSwitcher } from "./buttons/theme-switcher";

export default async function Navbar() {
    const session = await auth();
    return (
        <div className="fixed top-0 left-0 w-full">
            <div className="container p-5 flex justify-between gap-3">
                <ThemeSwitcher />
                {session ?
                    <div className="flex gap-3">
                        <CreateButton />
                        <LogoutButton />
                    </div>
                    :
                    <SignInButton />
                }
            </div>
        </div>
    )
}