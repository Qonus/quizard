import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export interface ResponsiveDialogProps {
    title?: string,
    description?: string,
    children?: ReactNode,
    content: ReactNode
}

export function ResponsiveDialog({ title, description, children, content }: ResponsiveDialogProps) {
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();

    if (!isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {content}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side="top">
                <div className="p-5 pb-10 w-full max-w-100 m-auto">
                    <SheetHeader className="text-left">
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>
                            {description}
                        </SheetDescription>
                    </SheetHeader>
                    {content}
                </div>
            </SheetContent>
        </Sheet>
    )
}