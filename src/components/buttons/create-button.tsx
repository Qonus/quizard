"use client";

import { Plus } from "lucide-react";
import CreateForm from "../forms/create-form";
import DialogButton from "./dialog-button";

export default function CreateButton() {
    return (
        <DialogButton content={<CreateForm />}>
            <Plus className="size-7 w-fit z-10" />
        </DialogButton>
    );
}