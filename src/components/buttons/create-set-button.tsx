"use client";

import { Plus } from "lucide-react";
import EditSetForm from "../forms/create-set-form";
import DialogButton from "./dialog-button";

export default function CreateSetButton() {
    return (
        <DialogButton content={<EditSetForm />}>
            <Plus className="size-7 w-fit z-10" />
        </DialogButton>
    );
}