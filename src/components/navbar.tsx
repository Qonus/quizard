import { auth } from "@/lib/auth";
import { submitLogout } from "@/lib/server-utils";
import { LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import CreateSetButton from "./buttons/create-set-button";
import LocaleSwitcher from "./buttons/locale-switcher";
import { Logo } from "./buttons/logo-button";
import SignInButton from "./buttons/sign-in-button";
import ThemeSwitcher from "./buttons/theme-switcher";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default async function Navbar() {
    const session = await auth();
    const t = await getTranslations();
    return (
        <div className="z-50 sticky top-0 left-0 w-full backdrop-blur-lg border-b-1">
            <div className="container p-5 flex justify-between gap-3">
                <Logo />
                {session ?
                    <div className="flex gap-3 items-center">
                        <CreateSetButton />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-full outline-1 outline-primary/30 p-0 overflow-hidden size-fit cursor-pointer">
                                    <Image
                                        src={session.user?.image || ""}
                                        width={50}
                                        height={50}
                                        alt="profile picture" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" className="m-5">
                                <DropdownMenuLabel className="font-bold text-lg">{session.user?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <ThemeSwitcher />
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <LocaleSwitcher />
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={submitLogout}>
                                    <LogOut />
                                    {t("logout")}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    :
                    <SignInButton />
                }
            </div>
        </div>
    )
}