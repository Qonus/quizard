import { auth } from "@/lib/auth";
import CreateSetButton from "./buttons/create-set-button";
import LogoutButton from "./buttons/logout-button";
import SignInButton from "./buttons/sign-in-button";
import { ThemeSwitcher } from "./buttons/theme-switcher";

export default async function Navbar() {
    const session = await auth();
    return (
        <div className="sticky top-0 left-0 w-full">
            <div className="container p-5 flex justify-between gap-3">
                <ThemeSwitcher />
                {session ?
                    <div className="flex gap-3">
                        <CreateSetButton />
                        <LogoutButton />
                    </div>
                    :
                    <SignInButton />
                }
            </div>
        </div>
    )
}